import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CheckoutSuccessClient from "@/components/cart/CheckoutSuccessClient";

export default async function CheckoutSuccessPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const sessionParam = searchParams.session_id;
  const paymentIntentParam = searchParams.payment_intent;

  const sessionId = Array.isArray(sessionParam) ? sessionParam[0] : sessionParam;
  const paymentIntentId = Array.isArray(paymentIntentParam)
    ? paymentIntentParam[0]
    : paymentIntentParam;

  const referenceId = paymentIntentId || sessionId;
  const referenceLabel = paymentIntentId ? "PaymentIntent" : sessionId ? "Session" : null;

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <CheckoutSuccessClient referenceId={referenceId} referenceLabel={referenceLabel} />
        <Footer />
      </div>
    </main>
  );
}
