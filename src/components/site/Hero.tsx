import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={hero}
          alt="Men gathered in reverent theological discussion under heavenly light"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud/30 via-navy/30 to-navy/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--sky)_55%,transparent)_0%,transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-60">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-white/70 blur-[1px]"
              style={{
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                left: `${(i * 53) % 100}%`,
                top: `${(i * 37) % 100}%`,
                animation: `fade-in ${4 + (i % 5)}s ease-in-out ${i * 0.2}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-40 lg:px-10 lg:pb-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow text-sky">Est. 1987 · Connecticut</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-cloud sm:text-6xl lg:text-[5.5rem]">
            Mars Hill
            <br />
            <span className="italic text-sky">Apologetics</span>
          </h1>
          <div className="gold-rule my-8 max-w-xs" />
          <p className="max-w-xl text-pretty text-lg font-light text-cloud/85 sm:text-xl">
            Defending truth. Pursuing wisdom. Equipping men to think Biblically —
            with the rigor of the academy and the reverence of the church.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#tot"
              className="group inline-flex items-center gap-3 rounded-full bg-cloud px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-navy transition hover:bg-gold hover:text-navy"
            >
              Explore Theology on Tap
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#papers"
              className="inline-flex items-center gap-3 rounded-full border border-cloud/40 px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-cloud transition hover:border-gold hover:text-gold"
            >
              Read Seminary Papers
            </a>
            <a
              href="#podcast"
              className="text-sm font-medium uppercase tracking-[0.18em] text-cloud/80 underline-offset-8 transition hover:text-gold hover:underline"
            >
              Listen to the Podcast →
            </a>
          </div>
        </div>

        <div className="mt-20 hidden grid-cols-3 gap-12 border-t border-cloud/15 pt-8 text-cloud/70 md:grid">
          <div>
            <p className="eyebrow text-gold">Scripture</p>
            <p className="mt-2 font-display text-base italic">
              "Always be prepared to give an answer." — 1 Peter 3:15
            </p>
          </div>
          <div>
            <p className="eyebrow text-gold">Tradition</p>
            <p className="mt-2 text-sm">Reformed · Confessional · Five Solas</p>
          </div>
          <div>
            <p className="eyebrow text-gold">Founded</p>
            <p className="mt-2 text-sm">By John Leonetti, M.A. — Biola University</p>
          </div>
        </div>
      </div>
    </section>
  );
}
