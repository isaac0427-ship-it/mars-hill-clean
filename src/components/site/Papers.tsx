import { useMemo, useState } from "react";
import { useContent } from "@/context/ContentContext";

const categories = ["All", "Doctrine", "World Religions", "Culture", "History", "Philosophy"] as const;

function toDownloadUrl(url: string): string {
  return url;
}

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
        {/* Header row */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">The Archive</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.05] text-navy sm:text-5xl lg:text-6xl">
              Public<span className="italic text-gold"> Publications.</span>
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

        {/* Category filter */}
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

        {/* Loading skeletons */}
        {loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-sky/20" />
            ))}
          </div>
        )}

        {/* Paper cards */}
        {!loading && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
              >
                {/* Category + Year */}
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-sky/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                    {p.category}
                  </span>
                  <span className="font-display text-xs text-slate-400">{p.year}</span>
                </div>

                {/* Title + summary */}
                <h3 className="mt-5 font-display text-xl leading-tight text-navy">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.summary}</p>

                {/* Download button */}
                <div className="mt-7 border-t border-slate-100 pt-5">
                  {p.pdf_link ? (
                    <a
                      href={toDownloadUrl(p.pdf_link)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-gold hover:text-navy"
                      onClick={(e) => {
                        e.stopPropagation();
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (window as any).gtag?.("event", "file_download", {
                          file_name: p.title,
                          file_extension: "pdf",
                          link_url: p.pdf_link,
                        });
                      }}
                    >
                      {/* Download icon */}
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </a>
                  ) : (
                    <span className="text-xs italic text-slate-400">PDF coming soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && papers.length === 0 && (
          <p className="mt-16 text-center text-sm text-slate-500 italic">Papers coming soon.</p>
        )}

        {!loading && papers.length > 0 && filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-slate-500">No papers match that search.</p>
        )}
      </div>
    </section>
  );
}
