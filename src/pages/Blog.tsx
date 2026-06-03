import { Link } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useContent } from "@/context/ContentContext";

export default function BlogPage() {
  const { blogPosts, loading } = useContent();
  const [featured, ...rest] = blogPosts;

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />

      <section className="heaven-bg pt-40 pb-16 lg:pt-48">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
          <p className="eyebrow">Field Notes</p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
            The<span className="italic text-gold"> Blog.</span>
          </h1>
          <div className="gold-rule mx-auto my-8 max-w-[8rem]" />
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-ink">
            Brief reflections on theology, philosophy, apologetics, and the
            care of the church — from the desk of John Leonetti.
          </p>
        </div>
      </section>

      {loading ? (
        <section className="py-16"><div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-6">{[1,2].map(i=><div key={i} className="h-48 animate-pulse rounded-3xl bg-sky/30"/>)}</div></section>
      ) : featured ? (
        <>
          <section className="py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <article className="grid gap-10 rounded-3xl border border-border bg-white p-10 shadow-soft lg:grid-cols-12 lg:p-14">
                <div className="lg:col-span-3">
                  <p className="eyebrow text-gold">Featured</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-ink">{featured.date_text}</p>
                </div>
                <div className="lg:col-span-9">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">{featured.category}</p>
                  <h2 className="mt-3 font-display text-4xl font-light leading-tight text-navy sm:text-5xl">{featured.title}</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-ink">{featured.summary}</p>
                  {featured.content && (
                    <div className="mt-8 prose prose-navy max-w-2xl text-slate-ink text-base leading-relaxed whitespace-pre-wrap">
                      {featured.content}
                    </div>
                  )}
                  <Link to="/contact" className="mt-8 inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-navy hover:text-gold">
                    Get in touch <span>→</span>
                  </Link>
                </div>
              </article>
            </div>
          </section>

          {rest.length > 0 && (
            <section className="pb-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => (
                    <li key={p.id}>
                      <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:border-gold hover:shadow-[var(--shadow-luxe)]">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-gold">{p.category}</p>
                        <h3 className="mt-4 font-display text-2xl leading-snug text-navy">{p.title}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-ink">{p.summary}</p>
                        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs uppercase tracking-[0.2em] text-slate-ink">
                          <span>{p.date_text}</span>
                          <span className="text-navy transition group-hover:text-gold">Read →</span>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-24 text-center text-slate-ink">No posts yet.</section>
      )}

      <Footer />
    </main>
  );
}
