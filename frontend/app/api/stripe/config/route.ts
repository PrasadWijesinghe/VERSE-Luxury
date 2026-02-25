import { NextResponse } from "next/server";

import { getStripePublishableKey } from "../stripeEnv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const publishableKey = getStripePublishableKey();

  if (!publishableKey) {
    return NextResponse.json({
      configured: false,
      publishableKey: null,
      error:
        "Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (or STRIPE_PUBLISHABLE_KEY). Add it to frontend/.env.local and restart next dev.",
    });
  }

  // Publishable key is safe to send to the browser.
  return NextResponse.json({ configured: true, publishableKey });
}
