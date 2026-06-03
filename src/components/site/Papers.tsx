import { useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

const categories = ["All", "Doctrine", "World Religions", "Culture", "History", "Philosophy"] as const;

export function Papers() {
  const { papers, loading } = useContent();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return papers.filter((p) => {
      const matchesCat = cat === "All" || p.category === cat;
      const q = query.trim().toLowerCase();
      const matchesQ = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [papers, cat, query]);

  return (
    <section id="papers" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">The Archive</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
              Seminary<span className="italic text-gold"> Papers.</span>
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              A working archive of graduate-level theological writing — open to
              the church, freely given for study, prayer, and conversation.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive…"
              className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none lg:w-72"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                cat === c
                  ? "border-navy bg-navy text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-gold hover:text-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-sky/20" />
            ))}
          </div>
        )}

        {!loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => {
              const card = (
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-sky/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                      {p.category}
                    </span>
                    <span className="font-display text-xs text-slate-400">{p.year}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl leading-tight text-navy">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.summary}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">PDF · A4</span>
                    {p.pdf_link ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-navy transition group-hover:text-gold">
                        Read paper →
                      </span>
                    ) : (
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-400 italic">
                        PDF not yet available
                      </span>
                    )}
                  </div>
                </article>
              );

              return (
                <div key={p.id} className="h-full">
                  {p.pdf_link ? (
                    <a href={p.pdf_link} target="_blank" rel="noreferrer" className="block h-full">
                      {card}
                    </a>
                  ) : (
                    card
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-slate-500">No papers match that search.</p>
        )}
      </div>
    </section>
  );
}
