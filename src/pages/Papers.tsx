import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Papers } from "@/components/site/Papers";
import { PageMeta } from "@/components/site/PageMeta";

export default function PapersPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <PageMeta
        title="Public Publications — Mars Hill Apologetics"
        description="A working archive of graduate-level theological writing by John Leonetti — open to the church, freely given for study, prayer, and conversation."
        path="/papers"
      />
      <Nav />
      {/* Heaven-bg header */}
      <section className="heaven-bg pt-36 pb-14 lg:pt-44">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Open Access</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            Public<span className="italic text-gold"> Publications.</span>
          </h1>
          <div className="gold-rule mx-auto my-7 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
            Graduate-level theological writing — open to the church, freely given for study, prayer, and conversation.
          </p>
        </div>
      </section>
      <Papers />
      <Footer />
    </main>
  );
}
