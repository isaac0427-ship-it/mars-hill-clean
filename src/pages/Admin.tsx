import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useContent,
  DEFAULT_PAPERS,
  DEFAULT_BOOKS,
  DEFAULT_EPISODES,
  type PaperCategory,
  type BookEra,
} from "@/context/ContentContext";

const ADMIN_PASSWORD = "MarsHill2024";
const AUTH_KEY = "mha-admin-auth";

// ── Login ──────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center heaven-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="grid h-12 w-12 mx-auto place-items-center rounded-full border border-gold/40 text-gold font-display text-xl">
            M
          </span>
          <h1 className="mt-4 font-display text-3xl font-light text-navy">
            Mars Hill <span className="italic text-gold">Admin</span>
          </h1>
          <p className="mt-2 text-sm text-slate-ink">Enter the admin password to continue.</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-border bg-white p-8 shadow-soft"
        >
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            autoFocus
            className="mt-3 w-full rounded-full border border-border bg-cloud px-5 py-3 text-navy focus:border-gold focus:outline-none"
          />
          {error && (
            <p className="mt-3 text-xs text-red-500 uppercase tracking-[0.18em]">
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-navy py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Papers manager ────────────────────────────────────────────────────────

const paperCategories: PaperCategory[] = [
  "Doctrine", "World Religions", "Culture", "History", "Philosophy",
];

function PapersManager() {
  const { papers, addPaper, deletePaper, resetPapers } = useContent();
  const [form, setForm] = useState({
    title: "",
    category: "Doctrine" as PaperCategory,
    year: "",
    summary: "",
    pdfUrl: "",
  });
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary) return;
    addPaper({
      title: form.title,
      category: form.category,
      year: form.year || new Date().getFullYear().toString(),
      summary: form.summary,
      pdfUrl: form.pdfUrl || undefined,
    });
    setForm({ title: "", category: "Doctrine", year: "", summary: "", pdfUrl: "" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Add form */}
      <div>
        <h2 className="font-display text-2xl text-navy">Add a Paper</h2>
        <form onSubmit={submit} className="mt-6 space-y-5">
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
              placeholder="The Arian Controversy"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category *">
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as PaperCategory }))}
                className={inputCls}
              >
                {paperCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Year (Roman numerals)">
              <input
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                className={inputCls}
                placeholder="MMXXIV"
              />
            </Field>
          </div>
          <Field label="Summary *">
            <textarea
              required
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              rows={3}
              className={`${inputCls} rounded-2xl`}
              placeholder="A brief description of the paper…"
            />
          </Field>
          <Field label="PDF Link (optional)">
            <input
              type="url"
              value={form.pdfUrl}
              onChange={(e) => setForm((f) => ({ ...f, pdfUrl: e.target.value }))}
              className={inputCls}
              placeholder="https://drive.google.com/…"
            />
          </Field>
          <div className="flex items-center gap-4">
            <button type="submit" className={btnPrimary}>Add Paper</button>
            {success && <span className="text-xs uppercase tracking-[0.2em] text-gold">Added ✓</span>}
          </div>
        </form>
      </div>

      {/* Current list */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy">
            Current Papers <span className="text-gold">({papers.length})</span>
          </h2>
          <button
            onClick={() => { if (confirm("Reset to original 10 papers?")) resetPapers(); }}
            className={btnGhost}
          >
            Reset
          </button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {papers.map((p, i) => (
            <li key={i} className="flex items-start gap-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy truncate">{p.title}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.year}</p>
                {p.pdfUrl && (
                  <a href={p.pdfUrl} target="_blank" rel="noreferrer" className="mt-0.5 block truncate text-xs text-slate-ink hover:text-navy">
                    {p.pdfUrl}
                  </a>
                )}
              </div>
              <button
                onClick={() => { if (confirm(`Delete "${p.title}"?`)) deletePaper(i); }}
                className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Library manager ───────────────────────────────────────────────────────

const bookEras: BookEra[] = ["Patristic", "Reformation", "Puritan", "Modern", "Apologetics"];

function LibraryManager() {
  const { books, addBook, deleteBook, resetBooks } = useContent();
  const [form, setForm] = useState({
    title: "",
    author: "",
    era: "Modern" as BookEra,
    year: "",
    note: "",
  });
  const [success, setSuccess] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) return;
    addBook({
      title: form.title,
      author: form.author,
      era: form.era,
      year: form.year,
      note: form.note,
    });
    setForm({ title: "", author: "", era: "Modern", year: "", note: "" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-2xl text-navy">Add a Book</h2>
        <form onSubmit={submit} className="mt-6 space-y-5">
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
              placeholder="Institutes of the Christian Religion"
            />
          </Field>
          <Field label="Author *">
            <input
              required
              value={form.author}
              onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
              className={inputCls}
              placeholder="John Calvin"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Era *">
              <select
                value={form.era}
                onChange={(e) => setForm((f) => ({ ...f, era: e.target.value as BookEra }))}
                className={inputCls}
              >
                {bookEras.map((e) => <option key={e}>{e}</option>)}
              </select>
            </Field>
            <Field label="Year">
              <input
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                className={inputCls}
                placeholder="1559"
              />
            </Field>
          </div>
          <Field label="Note">
            <textarea
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              rows={2}
              className={`${inputCls} rounded-2xl`}
              placeholder="One sentence description…"
            />
          </Field>
          <div className="flex items-center gap-4">
            <button type="submit" className={btnPrimary}>Add Book</button>
            {success && <span className="text-xs uppercase tracking-[0.2em] text-gold">Added ✓</span>}
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy">
            Current Library <span className="text-gold">({books.length})</span>
          </h2>
          <button
            onClick={() => { if (confirm("Reset to original 12 books?")) resetBooks(); }}
            className={btnGhost}
          >
            Reset
          </button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {books.map((b, i) => (
            <li key={i} className="flex items-start gap-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy truncate">{b.title}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-gold">{b.author} · {b.era} · {b.year}</p>
              </div>
              <button
                onClick={() => { if (confirm(`Delete "${b.title}"?`)) deleteBook(i); }}
                className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Podcast manager ───────────────────────────────────────────────────────

function PodcastManager() {
  const { episodes, addEpisode, deleteEpisode, resetEpisodes } = useContent();
  const [form, setForm] = useState({ n: "", title: "", length: "" });
  const [success, setSuccess] = useState(false);

  const nextNum = String(episodes.length + 1).padStart(2, "0");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addEpisode({
      n: form.n || nextNum,
      title: form.title,
      length: form.length || "— min",
    });
    setForm({ n: "", title: "", length: "" });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-2xl text-navy">Add an Episode</h2>
        <form onSubmit={submit} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Episode # (next: ${nextNum})`}>
              <input
                value={form.n}
                onChange={(e) => setForm((f) => ({ ...f, n: e.target.value }))}
                className={inputCls}
                placeholder={nextNum}
              />
            </Field>
            <Field label="Length">
              <input
                value={form.length}
                onChange={(e) => setForm((f) => ({ ...f, length: e.target.value }))}
                className={inputCls}
                placeholder="42 min"
              />
            </Field>
          </div>
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputCls}
              placeholder="Calvin on the Knowledge of God"
            />
          </Field>
          <div className="flex items-center gap-4">
            <button type="submit" className={btnPrimary}>Add Episode</button>
            {success && <span className="text-xs uppercase tracking-[0.2em] text-gold">Added ✓</span>}
          </div>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-navy">
            Episodes <span className="text-gold">({episodes.length})</span>
          </h2>
          <button
            onClick={() => { if (confirm("Reset to original 4 episodes?")) resetEpisodes(); }}
            className={btnGhost}
          >
            Reset
          </button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {episodes.map((e, i) => (
            <li key={i} className="flex items-center gap-4 py-4">
              <span className="font-display text-xl text-gold">{e.n}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy truncate">{e.title}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-ink">{e.length}</p>
              </div>
              <button
                onClick={() => { if (confirm(`Delete "${e.title}"?`)) deleteEpisode(i); }}
                className="shrink-0 text-xs uppercase tracking-[0.18em] text-slate-ink hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Shared UI helpers ─────────────────────────────────────────────────────

const inputCls =
  "mt-2 w-full rounded-full border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy";
const btnGhost =
  "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-navy";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">{label}</label>
      {children}
    </div>
  );
}

// ── Main admin shell ──────────────────────────────────────────────────────

type Tab = "papers" | "library" | "podcast";

const tabs: { id: Tab; label: string }[] = [
  { id: "papers", label: "Seminary Papers" },
  { id: "library", label: "Library" },
  { id: "podcast", label: "Podcast" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [activeTab, setActiveTab] = useState<Tab>("papers");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-cloud">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-cloud/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 text-gold font-display text-base">
              M
            </span>
            <span className="font-display text-sm tracking-tight text-navy">
              Mars Hill <span className="text-gold">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy"
            >
              ← View site
            </Link>
            <button
              onClick={logout}
              className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 pb-0 lg:px-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`shrink-0 border-b-2 px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${
                activeTab === t.id
                  ? "border-gold text-navy"
                  : "border-transparent text-slate-ink hover:text-navy"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft lg:p-12">
          {activeTab === "papers" && <PapersManager />}
          {activeTab === "library" && <LibraryManager />}
          {activeTab === "podcast" && <PodcastManager />}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.22em] text-slate-ink">
          Changes save instantly and persist in your browser · Soli Deo Gloria
        </p>
      </main>
    </div>
  );
}
