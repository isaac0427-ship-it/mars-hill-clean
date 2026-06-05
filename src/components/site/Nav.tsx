import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { to: "/about",           label: "About" },
  { to: "/theology-on-tap", label: "Theology on Tap" },
  { to: "/papers",          label: "Papers" },
  { to: "/podcast",         label: "Podcast" },
  { to: "/library",         label: "Library" },
  { to: "/blog",            label: "Blog" },
  { to: "/contact",         label: "Contact" },
] as const;

const allLinks = [
  { to: "/",                label: "Home",             num: "01" },
  { to: "/about",           label: "About",            num: "02" },
  { to: "/theology-on-tap", label: "Theology on Tap",  num: "03" },
  { to: "/papers",          label: "Public Publications",  num: "04" },
  { to: "/podcast",         label: "Podcast",          num: "05" },
  { to: "/library",         label: "Library",          num: "06" },
  { to: "/blog",            label: "Blog",             num: "07" },
  { to: "/steeped-in-truth",label: "Steeped in Truth", num: "08" },
  { to: "/resources",       label: "Resources",        num: "09" },
  { to: "/contact",         label: "Contact",          num: "10" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location                = useLocation();
  const { getSetting }          = useContent();

  const SPOTIFY  = getSetting("spotify_url",  "https://open.spotify.com/show/4xnDbJFrb1gpwHfyEabZoG");
  const YOUTUBE  = getSetting("youtube_url",  "https://www.youtube.com/channel/UCIDs8zPms4tbsYJKOu");
  const FACEBOOK = getSetting("facebook_url", "https://www.facebook.com/marshillapologetics");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlay when route changes
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const barBg = scrolled || open
    ? "bg-white/96 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
    : "bg-transparent";

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${barBg}`}>
        <div className="mx-auto flex max-w-7xl items-center px-5 py-3.5 lg:px-10">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/50 font-display text-base font-semibold text-gold">
              M
            </span>
            <span className="font-display text-sm font-normal tracking-tight text-navy">
              Mars Hill <span className="italic text-gold">Apologetics</span>
            </span>
          </Link>

          {/* Desktop center nav — hidden below lg */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex" aria-label="Main navigation">
            {navLinks.map((l) => {
              const active = location.pathname === (l.to as string) ||
                ((l.to as string) !== "/" && location.pathname.startsWith(l.to as string));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.13em] transition-colors ${
                    active ? "text-gold font-semibold" : "text-navy/75 hover:text-navy"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            {/* Ministry Login — desktop only */}
            <Link
              to="/admin"
              className="hidden items-center rounded-full border border-gold/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-navy lg:inline-flex"
            >
              Ministry Login
            </Link>

            {/* Hamburger — mobile only (hidden on lg+) */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white/80 backdrop-blur transition hover:border-gold lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 right-0 h-[1.5px] rounded bg-navy transition-all duration-300 ${open ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 right-0 top-2 h-[1.5px] rounded bg-navy transition-all duration-300 ${open ? "opacity-0 scale-x-0" : "opacity-100"}`} />
                <span className={`absolute left-0 right-0 h-[1.5px] rounded bg-navy transition-all duration-300 ${open ? "top-2 -rotate-45" : "top-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ──────────────────────── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        {/* Background */}
        <div className="absolute inset-0 navy-bg" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--sky)_20%,transparent)_0%,transparent_60%)]" />

        <div className="relative flex h-full flex-col overflow-y-auto px-6 pb-12 pt-24">
          <div className="grid flex-1 gap-10 lg:grid-cols-12">

            <nav className="flex-1" aria-label="Mobile navigation">
              <p className="eyebrow text-gold">Navigate</p>
              <div className="mt-6 divide-y divide-white/10">
                {allLinks.map((l, i) => {
                  const active = location.pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`group flex items-baseline gap-5 py-4 transition ${open ? "animate-fade-up" : ""}`}
                      style={{ animationDelay: `${i * 35}ms` }}
                    >
                      <span className="w-6 shrink-0 font-display text-xs tracking-[0.28em] text-gold/60">{l.num}</span>
                      <span className={`font-display text-3xl font-light leading-tight ${active ? "italic text-gold" : "text-white group-hover:text-gold"} transition-colors`}>
                        {l.label}
                      </span>
                      <span className="ml-auto text-white/30 transition group-hover:translate-x-1 group-hover:text-gold">→</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <aside className="border-t border-white/10 pt-8">
              <p className="eyebrow text-gold">Connect</p>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li><a className="hover:text-gold transition" href="mailto:defender315@msn.com">defender315@msn.com</a></li>
                <li><a className="hover:text-gold transition" href="tel:+12037255918">(203) 725-5918</a></li>
                <li className="text-white/50">Connecticut, USA</li>
              </ul>

              <p className="eyebrow mt-8 text-gold">Listen & Watch</p>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                <li><a className="hover:text-gold transition" target="_blank" rel="noreferrer" href={SPOTIFY}>Spotify →</a></li>
                <li><a className="hover:text-gold transition" target="_blank" rel="noreferrer" href={YOUTUBE}>YouTube →</a></li>
                <li><a className="hover:text-gold transition" target="_blank" rel="noreferrer" href={FACEBOOK}>Facebook →</a></li>
              </ul>

              <Link to="/admin" className="mt-8 inline-flex items-center rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-navy">
                Ministry Login
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
