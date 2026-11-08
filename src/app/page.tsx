import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#08080a]">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
