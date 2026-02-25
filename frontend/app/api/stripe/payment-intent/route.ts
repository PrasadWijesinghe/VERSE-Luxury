import { NextResponse } from "next/server";
import Stripe from "stripe";

import { products } from "@/data/products";
import { getStripeSecretKey } from "../stripeEnv";

export const runtime = "nodejs";

type CheckoutItem = {
  productId: number;
  quantity: number;
};

type PaymentIntentRequestBody = {
  items: CheckoutItem[];
  customerEmail?: string;
  customerName?: string;
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
    throw new Error(
      "Missing STRIPE_SECRET_KEY. Add it to frontend/.env.local and restart the dev server."
    );
  }

  return new Stripe(secretKey);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PaymentIntentRequestBody;
    const items = normalizeItems(body.items);

    if (items.length === 0) {
      return NextResponse.json({ error: "No items" }, { status: 400 });
    }

    let currency: string | null = null;
    let amountCents = 0;
    const productIds: number[] = [];

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
      amountCents += unitAmount * item.quantity;
    }

    if (!currency) {
      return NextResponse.json({ error: "Missing currency" }, { status: 400 });
    }

    const stripe = getStripe();
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: currency.toLowerCase(),
      payment_method_types: ["card"],
      receipt_email: body.customerEmail,
      metadata: {
        productIds: productIds.join(","),
        customerName: body.customerName ?? "",
      },
    });

    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
