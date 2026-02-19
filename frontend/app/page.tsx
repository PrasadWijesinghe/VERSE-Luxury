import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import SignaturePieces from "@/components/home/SignaturePieces";
import NewArrivals from "@/components/home/NewArrivals";
import About from "@/components/home/About";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <SignaturePieces />
      <About />
      <NewArrivals />
      <Newsletter />
      <Footer />
    </main>
  );
}