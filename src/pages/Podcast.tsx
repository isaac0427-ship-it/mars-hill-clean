import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Podcast } from "@/components/site/Podcast";
import { PodcastPlayer } from "@/components/site/PodcastPlayer";

export default function PodcastPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      <section className="navy-bg pt-40 pb-20 text-cloud lg:pt-48">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-gold">Now Streaming</p>
              <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
                Reformed
                <br />
                <span className="italic text-gold">Reference.</span>
              </h1>
              <div className="gold-rule my-8 max-w-[8rem]" />
              <p className="text-pretty text-lg leading-relaxed text-cloud/80">
                A weekly study where the wisdom of the great Reformed
                theologians echoes through the ages. Press play below — every
                episode, freely available.
              </p>
            </div>
            <div className="lg:col-span-6">
              <PodcastPlayer height={420} />
            </div>
          </div>
        </div>
      </section>

      <Podcast />
      <Footer />
    </main>
  );
}
