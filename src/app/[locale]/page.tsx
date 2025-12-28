import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Levels from "@/components/Levels";
import Requirements from "@/components/Requirements";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <div id="benefits">
        <Benefits />
      </div>
      <div id="levels">
        <Levels />
      </div>
      <div id="requirements">
        <Requirements />
      </div>
      <Footer />
    </main>
  );
}
