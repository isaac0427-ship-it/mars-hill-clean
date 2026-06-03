import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <section className="heaven-bg pt-40 pb-12 lg:pt-48">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">The Founder</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            About<span className="italic text-gold"> John Leonetti.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
        </div>
      </section>
      <About />
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 rounded-full bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy"
        >
          Get in touch →
        </Link>
      </div>
      <Footer />
    </main>
  );
}
