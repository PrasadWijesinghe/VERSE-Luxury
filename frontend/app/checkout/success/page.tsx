import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CheckoutSuccessClient from "@/components/cart/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <CheckoutSuccessClient />
        <Footer />
      </div>
    </main>
  );
}
