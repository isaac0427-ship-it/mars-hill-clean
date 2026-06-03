import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Papers } from "@/components/site/Papers";

export default function PapersPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-24">
        <Papers />
      </div>
      <Footer />
    </main>
  );
}
