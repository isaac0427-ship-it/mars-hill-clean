import { Link } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

export function Footer() {
  const { getSetting } = useContent();
  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/@marshillnewengland2027");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/share/g/14dGK4RaWGr/");

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/50 font-display text-lg font-semibold text-gold">M</span>
              <span className="font-display text-base tracking-tight text-navy">Mars Hill <span className="italic text-gold">Apologetics</span></span>
            </div>
            <p className="mt-5 font-display text-2xl font-light leading-snug text-navy sm:text-3xl">
              "Worship the Lord in the
              <span className="italic text-gold"> beauty of holiness."</span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Psalm 96:9</p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["/about",           "About"],
                ["/theology-on-tap", "Theology on Tap"],
                ["/papers",          "Seminary Papers/Publications"],
                ["/podcast",         "Podcast"],
                ["/library",         "Library"],
                ["/blog",            "Blog"],
                ["/steeped-in-truth","Steeped in Truth"],
                ["/resources",       "Resources"],
                ["/contact",         "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-slate-600 transition hover:text-navy">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe + social */}
          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Subscribe</p>
            <p className="mt-3 text-sm text-slate-600">
              A quiet monthly note — new papers, episodes, and gatherings.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none"
              />
              <button className="bg-navy px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-gold hover:text-navy">
                Join
              </button>
            </form>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">Follow</p>
            <div className="mt-3 flex gap-2">
              {[
                { n: "Facebook", url: FACEBOOK },
                { n: "YouTube",  url: YOUTUBE },
                { n: "Spotify",  url: SPOTIFY },
              ].map((s) => (
                <a key={s.n} href={s.url} target="_blank" rel="noreferrer"
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:border-gold hover:text-navy">
                  {s.n}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-100 pt-8 flex flex-col items-start justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Mars Hill Apologetics</p>
          <a href="mailto:defender315@msn.com" className="hover:text-navy transition">defender315@msn.com</a>
          <p>Soli Deo Gloria</p>
        </div>
      </div>
    </footer>
  );
}
