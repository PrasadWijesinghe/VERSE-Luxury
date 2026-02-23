import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import PayClient from "@/components/cart/PayClient";

export const metadata = {
  title: "Payment | VERSE",
};

export default function PayPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <PayClient />
        <Footer />
      </div>
    </main>
  );
}
