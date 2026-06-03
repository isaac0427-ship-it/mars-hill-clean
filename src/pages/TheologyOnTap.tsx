import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { TheologyOnTap } from "@/components/site/TheologyOnTap";

export default function TheologyOnTapPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-24">
        <TheologyOnTap />
      </div>
      <Footer />
    </main>
  );
}
