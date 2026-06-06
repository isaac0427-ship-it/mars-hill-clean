import founder from "@/assets/founder-real.jpg";

export function About() {
  return (
    <section id="about" className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-navy/8">
            <img
              src={founder}
              alt="John Leonetti, founder of Mars Hill Apologetics"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span className="h-px w-8 bg-gold" />
            John Leonetti · Founder
          </div>
        </div>

        <div className="lg:col-span-8 lg:pt-4">
          <p className="eyebrow">About the Founder</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
            A lifetime of contending
            <span className="italic text-gold"> for the faith.</span>
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              My name is <span className="font-semibold text-navy">John Leonetti</span>,
              and I have walked with Christ since 1985. In the years following my
              conversion, I encountered men and women drawn into cults — groups
              gathered around a teacher or institution claiming harmony with
              Scripture, yet quietly denying its essential doctrines.
            </p>
            <p>
              That experience ignited a lifelong devotion to Christian
              apologetics: the discipline of communicating the faith with both
              clarity and love to those who do not yet believe. Peter calls every
              believer to be <em>"prepared to give an answer"</em> (1 Peter 3:15),
              and Jude exhorts us to <em>"earnestly contend for the faith"</em>{" "}
              (Jude 3).
            </p>
            <p>
              Since 1987 I have answered doorbells, taught Sunday school to
              children and adults, and occasionally filled the pulpit. In 2017 I
              founded <span className="font-semibold text-navy">Theology on Tap</span>,
              a monthly gathering of men. In 2023 I completed my Master of Arts
              in Christian Apologetics at Biola University. I have served as an
              academic librarian for over twenty years.
            </p>
            <p>
              I have been married to my wife <span className="font-medium text-navy">Tara</span>{" "}
              since 1995. We have a daughter, <span className="font-medium text-navy">Hannah</span>,
              and a son, <span className="font-medium text-navy">Joshua</span>. I believe the
              Bible is the ultimate source of truth, justice, morality, meaning,
              and beauty.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="mailto:defender315@msn.com"
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-navy hover:text-gold transition"
            >
              <span className="h-px w-8 bg-navy transition-all group-hover:w-14 group-hover:bg-gold" />
              defender315@msn.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
