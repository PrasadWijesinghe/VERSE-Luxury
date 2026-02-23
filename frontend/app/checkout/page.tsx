import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import CheckoutClient from "@/components/cart/CheckoutClient";

export const metadata = {
  title: "Checkout | VERSE",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <CheckoutClient />
        <Footer />
      </div>
    </main>
  );
}
