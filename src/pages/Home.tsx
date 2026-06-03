import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { TheologyOnTap } from "@/components/site/TheologyOnTap";
import { Vision } from "@/components/site/Vision";
import { Papers } from "@/components/site/Papers";
import { Podcast } from "@/components/site/Podcast";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <TheologyOnTap />
      <Vision />
      <Papers />
      <Podcast />
      <Footer />
    </main>
  );
}
