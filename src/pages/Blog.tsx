import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  tag: string;
};

const posts: Post[] = [
  {
    slug: "on-the-knowledge-of-god",
    title: "On the Knowledge of God",
    excerpt:
      "Calvin opens the Institutes with a hinge: we cannot know ourselves without knowing God, nor God without knowing ourselves. A meditation.",
    date: "May 28, 2026",
    read: "6 min",
    tag: "Theology",
  },
  {
    slug: "kalam-revisited",
    title: "The Kalam Argument, Revisited",
    excerpt:
      "A short defense of the second premise — that the universe began to exist — drawing on contemporary cosmology and classical metaphysics.",
    date: "May 14, 2026",
    read: "9 min",
    tag: "Apologetics",
  },
  {
    slug: "machen-still-speaks",
    title: "Machen Still Speaks",
    excerpt:
      "A century after Christianity and Liberalism, Machen's diagnosis remains startlingly current. The two religions still walk our pews.",
    date: "April 30, 2026",
    read: "7 min",
    tag: "Church History",
  },
  {
    slug: "reading-the-affections",
    title: "Reading Edwards on the Affections",
    excerpt:
      "Jonathan Edwards on the marks of genuine religious affection — and why every believer should sit, slowly, with this Puritan classic.",
    date: "April 12, 2026",
    read: "5 min",
    tag: "Puritans",
  },
  {
    slug: "the-trinity-and-modalism",
    title: "The Trinity and the Modalist Temptation",
    excerpt:
      "Why oneness theology continually re-emerges, and why the historic doctrine of the Trinity is not a riddle but a refuge.",
    date: "March 27, 2026",
    read: "8 min",
    tag: "Doctrine",
  },
  {
    slug: "why-god-allows-evil",
    title: "Why God Allows Evil",
    excerpt:
      "A working theodicy rooted in the sovereignty and goodness of God — and an honest reckoning with the limits of our seeing.",
    date: "March 06, 2026",
    read: "10 min",
    tag: "Philosophy",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      <section className="heaven-bg pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Field Notes</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            The
            <span className="italic text-gold"> Blog.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            Brief reflections on theology, philosophy, apologetics, and the
            care of the church — from the desk of John Leonetti.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <article className="grid gap-10 rounded-3xl border border-border bg-white p-10 shadow-soft lg:grid-cols-12 lg:p-14">
            <div className="lg:col-span-3">
              <p className="eyebrow text-gold">Featured</p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-ink">
                {featured.date} · {featured.read}
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="text-xs uppercase tracking-[0.24em] text-gold">
                {featured.tag}
              </p>
              <h2 className="mt-3 font-display text-4xl font-light leading-tight text-navy sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-ink">
                {featured.excerpt}
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-navy hover:text-gold"
              >
                Read essay
                <span>→</span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)]">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold">
                    {p.tag}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-snug text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">
                    {p.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.2em] text-slate-ink">
                    <span>{p.date}</span>
                    <span className="text-navy transition group-hover:text-gold">
                      {p.read} →
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
