import { NextResponse } from "next/server";
import Stripe from "stripe";

import { products } from "@/data/products";
import { getStripeSecretKey } from "../stripeEnv";

export const runtime = "nodejs";

type CheckoutItem = {
  productId: number;
  quantity: number;
};

type CheckoutRequestBody = {
  items: CheckoutItem[];
  customerEmail?: string;
};

function asNumber(value: unknown): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeItems(items: unknown): CheckoutItem[] {
  if (!Array.isArray(items)) return [];

  const cleaned: CheckoutItem[] = [];
  for (const item of items) {
    if (!item || typeof item !== "object") continue;

    const productId = asNumber((item as Record<string, unknown>).productId);
    const quantity = asNumber((item as Record<string, unknown>).quantity);

    if (productId === null || quantity === null) continue;

    cleaned.push({
      productId,
      quantity: Math.max(1, Math.min(99, Math.floor(quantity))),
    });
  }
  return cleaned;
}

function getStripe(): Stripe {
  const secretKey = getStripeSecretKey();
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  // Intentionally omit apiVersion here so it uses the library default.
  return new Stripe(secretKey);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;

    const origin = request.headers.get("origin") ?? new URL(request.url).origin;

    const items = normalizeItems(body.items);
    if (items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    // Resolve product data server-side so clients can’t spoof prices.
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const productIds: number[] = [];
    let currency: string | null = null;

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Unknown productId: ${item.productId}` },
          { status: 400 }
        );
      }

      currency = currency ?? product.currency;
      if (currency !== product.currency) {
        return NextResponse.json(
          { error: "All items must use the same currency" },
          { status: 400 }
        );
      }

      const unitAmount = Math.round(product.price * 100);
      if (!Number.isInteger(unitAmount) || unitAmount <= 0) {
        return NextResponse.json(
          { error: `Invalid price for productId: ${product.id}` },
          { status: 400 }
        );
      }

      productIds.push(product.id);

      lineItems.push({
        quantity: item.quantity,
        price_data: {
          currency: product.currency.toLowerCase(),
          unit_amount: unitAmount,
          product_data: {
            name: product.name,
            description: product.category,
            images:
              product.images?.length && typeof product.images[0] === "string"
                ? [
                    product.images[0].startsWith("http")
                      ? product.images[0]
                      : `${origin}${product.images[0]}`,
                  ]
                : undefined,
          },
        },
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
      customer_email: body.customerEmail,
      metadata: {
        productIds: productIds.join(","),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session created without redirect URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
