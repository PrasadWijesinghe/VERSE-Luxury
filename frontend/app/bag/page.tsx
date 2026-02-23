import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import BagClient from "@/components/cart/BagClient";

export const metadata = {
  title: "Bag | VERSE",
};

export default function BagPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <Navbar />
      <div className="pt-16">
        <BagClient />
        <Footer />
      </div>
    </main>
  );
}
