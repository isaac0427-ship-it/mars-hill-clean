import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useContent,
  type PaperCategory, type BookEra, type EventType,
  type Paper, type Book, type Episode, type Event, type BlogPost,
} from "@/context/ContentContext";

const ADMIN_PASSWORD = "MarsHill2024";
const AUTH_KEY = "mha-admin-auth";

// ── Shared UI primitives ───────────────────────────────────────────────────────

const inputCls = "mt-2 w-full rounded-full border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const areaCls  = "mt-2 w-full rounded-2xl border border-border bg-cloud px-5 py-3 text-sm text-navy placeholder:text-slate-ink/50 focus:border-gold focus:outline-none";
const btnPrimary = "inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy disabled:pointer-events-none disabled:opacity-40";
const btnSecondary = "inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy transition hover:bg-navy hover:text-cloud disabled:pointer-events-none disabled:opacity-40";
const btnGhost = "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-navy disabled:pointer-events-none disabled:opacity-40";
const btnDanger = "text-xs uppercase tracking-[0.18em] text-slate-ink transition hover:text-red-500 disabled:pointer-events-none disabled:opacity-40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">{label}</label>{children}</div>;
}
function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}
function Flash({ msg }: { msg: string }) {
  return msg ? <span className="text-xs uppercase tracking-[0.2em] text-gold">{msg}</span> : null;
}
function Tally({ n, loading }: { n: number; loading: boolean }) {
  return <span className="text-gold ml-1">({loading ? "…" : n})</span>;
}
function LoadingList() {
  return <div className="mt-6 space-y-3">{[1,2,3].map(i => <div key={i} className="h-11 animate-pulse rounded-xl bg-sky/40" />)}</div>;
}
function DbError({ msg }: { msg: string }) {
  return <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"><strong>Database error:</strong> {msg}</div>;
}
function SectionHead({ title, count, loading, onReset }: { title: string; count: number; loading: boolean; onReset?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-display text-2xl text-navy">{title}<Tally n={count} loading={loading} /></h2>
      {onReset && <button onClick={onReset} className={btnGhost}>Reset to defaults</button>}
    </div>
  );
}

function useFlash() {
  const [msg, setMsg] = useState("");
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  return [msg, flash] as const;
}

// ── Login ──────────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { localStorage.setItem(AUTH_KEY, "true"); onLogin(); }
    else { setErr(true); setPw(""); }
  };
  return (
    <div className="flex min-h-screen items-center justify-center heaven-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold/40 font-display text-xl text-gold">M</span>
          <h1 className="mt-4 font-display text-3xl font-light text-navy">Mars Hill <span className="italic text-gold">Admin</span></h1>
          <p className="mt-2 text-sm text-slate-ink">Enter the admin password to continue.</p>
        </div>
        <form onSubmit={submit} className="rounded-3xl border border-border bg-white p-8 shadow-soft">
          <label className="block text-xs uppercase tracking-[0.22em] text-slate-ink">Password</label>
          <input type="password" value={pw} autoFocus onChange={e => { setPw(e.target.value); setErr(false); }}
            className="mt-3 w-full rounded-full border border-border bg-cloud px-5 py-3 text-navy focus:border-gold focus:outline-none" />
          {err && <p className="mt-3 text-xs uppercase tracking-[0.18em] text-red-500">Incorrect password.</p>}
          <button type="submit" className="mt-6 w-full rounded-full bg-navy py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cloud transition hover:bg-gold hover:text-navy">Sign in</button>
        </form>
        <div className="mt-6 text-center"><Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← Back to site</Link></div>
      </div>
    </div>
  );
}

// ── Papers manager ─────────────────────────────────────────────────────────────

const PAPER_CATS: PaperCategory[] = ["Doctrine","World Religions","Culture","History","Philosophy"];

function PapersManager() {
  const { papers, addPaper, deletePaper, resetPapers, loading, dbError } = useContent();
  const [form, setForm] = useState({ title:"", category:"Doctrine" as PaperCategory, year:"", summary:"", pdf_link:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title || !form.summary) return;
    setBusy(true);
    await addPaper({ title:form.title, category:form.category, year:form.year||new Date().getFullYear().toString(), summary:form.summary, pdf_link:form.pdf_link||null });
    setForm({ title:"", category:"Doctrine", year:"", summary:"", pdf_link:"" });
    setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Paper</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="The Arian Controversy" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category *"><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value as PaperCategory}))} className={inputCls}>{PAPER_CATS.map(c=><option key={c}>{c}</option>)}</select></Field>
              <Field label="Year (e.g. MMXXIV)"><input value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} className={inputCls} placeholder="MMXXIV" /></Field>
            </div>
            <Field label="Summary *"><textarea required value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} rows={3} className={areaCls} placeholder="Brief description…" /></Field>
            <Field label="PDF Link"><input type="url" value={form.pdf_link} onChange={e=>setForm(f=>({...f,pdf_link:e.target.value}))} className={inputCls} placeholder="https://…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Paper"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Papers" count={papers.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 10?")){ setBusy(true); await resetPapers(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {papers.map(p=>(
                <li key={p.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{p.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.year}</p>
                    {p.pdf_link && <a href={p.pdf_link} target="_blank" rel="noreferrer" className="block truncate text-xs text-slate-ink hover:text-navy">{p.pdf_link}</a>}
                  </div>
                  <button onClick={async()=>{if(confirm(`Delete "${p.title}"?`)){ setBusy(true); await deletePaper(p.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Library manager ────────────────────────────────────────────────────────────

const BOOK_ERAS: BookEra[] = ["Patristic","Reformation","Puritan","Modern","Apologetics"];

function LibraryManager() {
  const { books, addBook, deleteBook, resetBooks, loading, dbError } = useContent();
  const [form, setForm] = useState({ title:"", author:"", era:"Modern" as BookEra, year:"", note:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title||!form.author) return;
    setBusy(true); await addBook(form);
    setForm({ title:"", author:"", era:"Modern", year:"", note:"" });
    setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add a Book</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Institutes of the Christian Religion" /></Field>
            <Field label="Author *"><input required value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} className={inputCls} placeholder="John Calvin" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Era *"><select value={form.era} onChange={e=>setForm(f=>({...f,era:e.target.value as BookEra}))} className={inputCls}>{BOOK_ERAS.map(e=><option key={e}>{e}</option>)}</select></Field>
              <Field label="Year"><input value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))} className={inputCls} placeholder="1559" /></Field>
            </div>
            <Field label="Note"><textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} rows={2} className={areaCls} placeholder="One sentence description…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Book"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Library" count={books.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 12?")){ setBusy(true); await resetBooks(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {books.map(b=>(
                <li key={b.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-navy">{b.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-gold">{b.author} · {b.era} · {b.year}</p>
                  </div>
                  <button onClick={async()=>{if(confirm(`Delete "${b.title}"?`)){ setBusy(true); await deleteBook(b.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Podcast episodes manager ───────────────────────────────────────────────────

function PodcastManager() {
  const { episodes, addEpisode, deleteEpisode, resetEpisodes, loading, dbError } = useContent();
  const [form, setForm] = useState({ number:"", title:"", length:"" });
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();
  const nextNum = String(episodes.length+1).padStart(2,"0");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title) return;
    setBusy(true); await addEpisode({ number:form.number||nextNum, title:form.title, length:form.length||"— min" });
    setForm({ number:"", title:"", length:"" }); setFlash("Added ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add an Episode</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={`Episode # (next: ${nextNum})`}><input value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} className={inputCls} placeholder={nextNum} /></Field>
              <Field label="Length"><input value={form.length} onChange={e=>setForm(f=>({...f,length:e.target.value}))} className={inputCls} placeholder="42 min" /></Field>
            </div>
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Calvin on the Knowledge of God" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Episode"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Episodes" count={episodes.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 4?")){ setBusy(true); await resetEpisodes(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {episodes.map((ep: Episode)=>(
                <li key={ep.id} className="flex items-center gap-4 py-4">
                  <span className="font-display text-xl text-gold">{ep.number}</span>
                  <div className="min-w-0 flex-1"><p className="truncate font-medium text-navy">{ep.title}</p><p className="text-xs uppercase tracking-[0.18em] text-slate-ink">{ep.length}</p></div>
                  <button onClick={async()=>{if(confirm(`Delete "${ep.title}"?`)){ setBusy(true); await deleteEpisode(ep.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Theology on Tap events manager ─────────────────────────────────────────────

const EVENT_TYPES: EventType[] = ["in-person","zoom","hybrid"];

function EventsManager() {
  const { events, addEvent, updateEvent, deleteEvent, resetEvents, loading, dbError } = useContent();
  const blank = { title:"", date_text:"", location:"", type:"in-person" as EventType };
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<string|null>(null);
  const [editForm, setEditForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title) return;
    setBusy(true); await addEvent(form);
    setForm(blank); setFlash("Added ✓"); setBusy(false);
  };

  const startEdit = (ev: Event) => { setEditId(ev.id); setEditForm({ title:ev.title, date_text:ev.date_text, location:ev.location, type:ev.type }); };
  const saveEdit = async () => {
    if (!editId) return; setBusy(true);
    await updateEvent(editId, editForm); setEditId(null); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-navy">Add an Event</h2>
          <form onSubmit={submit} className="mt-6 space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Reading Calvin's Institutes, Book I" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date (e.g. Apr 11)"><input value={form.date_text} onChange={e=>setForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Apr 11" /></Field>
              <Field label="Type"><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value as EventType}))} className={inputCls}>{EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></Field>
            </div>
            <Field label="Location / Notes"><input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} className={inputCls} placeholder="In Person · CT" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Event"}</button><Flash msg={flash} /></Row>
          </form>
        </div>
        <div>
          <SectionHead title="Upcoming Events" count={events.length} loading={loading} onReset={async()=>{if(confirm("Reset to original 3 events?")){ setBusy(true); await resetEvents(); setFlash("Reset ✓"); setBusy(false); }}} />
          {loading ? <LoadingList /> : (
            <ul className="mt-4 divide-y divide-border">
              {events.map((ev: Event)=>(
                <li key={ev.id} className="py-4">
                  {editId===ev.id ? (
                    <div className="space-y-3 rounded-2xl border border-gold/30 bg-sky/20 p-4">
                      <input value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Title" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input value={editForm.date_text} onChange={e=>setEditForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Apr 11" />
                        <select value={editForm.type} onChange={e=>setEditForm(f=>({...f,type:e.target.value as EventType}))} className={inputCls}>{EVENT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select>
                      </div>
                      <input value={editForm.location} onChange={e=>setEditForm(f=>({...f,location:e.target.value}))} className={inputCls} placeholder="Location" />
                      <Row><button onClick={saveEdit} disabled={busy} className={btnPrimary}>Save</button><button onClick={()=>setEditId(null)} className={btnGhost}>Cancel</button></Row>
                    </div>
                  ) : (
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-navy">{ev.title}</p>
                        <p className="text-xs uppercase tracking-[0.18em] text-gold">{ev.date_text} · {ev.type} · {ev.location}</p>
                      </div>
                      <div className="flex shrink-0 gap-3">
                        <button onClick={()=>startEdit(ev)} className={btnSecondary}>Edit</button>
                        <button onClick={async()=>{if(confirm(`Delete "${ev.title}"?`)){ setBusy(true); await deleteEvent(ev.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Blog posts manager ─────────────────────────────────────────────────────────

function BlogManager() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, loading, dbError } = useContent();
  const blank = { title:"", category:"", date_text:"", summary:"", content:"" };
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<string|null>(null);
  const [editForm, setEditForm] = useState(blank);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!form.title||!form.summary) return;
    setBusy(true);
    await addBlogPost({ ...form, date_text: form.date_text || new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}) });
    setForm(blank); setFlash("Added ✓"); setBusy(false);
  };

  const startEdit = (p: BlogPost) => { setEditId(p.id); setEditForm({ title:p.title, category:p.category, date_text:p.date_text, summary:p.summary, content:p.content }); };
  const saveEdit = async () => {
    if (!editId) return; setBusy(true);
    await updateBlogPost(editId, editForm); setEditId(null); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div className="space-y-8">
      {dbError && <DbError msg={dbError} />}
      <div>
        <h2 className="font-display text-2xl text-navy">Add a Post</h2>
        <form onSubmit={submit} className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Field label="Title *"><input required value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Machen Still Speaks" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Category"><input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className={inputCls} placeholder="Church History" /></Field>
              <Field label="Date"><input value={form.date_text} onChange={e=>setForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="April 30, 2026" /></Field>
            </div>
            <Field label="Summary *"><textarea required value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} rows={3} className={areaCls} placeholder="Opening paragraph or teaser…" /></Field>
          </div>
          <div className="space-y-5">
            <Field label="Full Content"><textarea value={form.content} onChange={e=>setForm(f=>({...f,content:e.target.value}))} rows={10} className={areaCls} placeholder="Full article body…" /></Field>
            <Row><button type="submit" disabled={busy||loading} className={btnPrimary}>{busy?"Saving…":"Add Post"}</button><Flash msg={flash} /></Row>
          </div>
        </form>
      </div>

      <div>
        <SectionHead title="Posts" count={blogPosts.length} loading={loading} />
        {loading ? <LoadingList /> : (
          <ul className="mt-4 divide-y divide-border">
            {blogPosts.map((p: BlogPost)=>(
              <li key={p.id} className="py-5">
                {editId===p.id ? (
                  <div className="space-y-4 rounded-2xl border border-gold/30 bg-sky/20 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input value={editForm.title} onChange={e=>setEditForm(f=>({...f,title:e.target.value}))} className={inputCls} placeholder="Title" />
                      <input value={editForm.category} onChange={e=>setEditForm(f=>({...f,category:e.target.value}))} className={inputCls} placeholder="Category" />
                    </div>
                    <input value={editForm.date_text} onChange={e=>setEditForm(f=>({...f,date_text:e.target.value}))} className={inputCls} placeholder="Date" />
                    <textarea value={editForm.summary} onChange={e=>setEditForm(f=>({...f,summary:e.target.value}))} rows={3} className={areaCls} placeholder="Summary" />
                    <textarea value={editForm.content} onChange={e=>setEditForm(f=>({...f,content:e.target.value}))} rows={6} className={areaCls} placeholder="Full content" />
                    <Row><button onClick={saveEdit} disabled={busy} className={btnPrimary}>Save</button><button onClick={()=>setEditId(null)} className={btnGhost}>Cancel</button></Row>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-navy">{p.title}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-gold">{p.category} · {p.date_text}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-ink">{p.summary}</p>
                    </div>
                    <div className="flex shrink-0 gap-3">
                      <button onClick={()=>startEdit(p)} className={btnSecondary}>Edit</button>
                      <button onClick={async()=>{if(confirm(`Delete "${p.title}"?`)){ setBusy(true); await deleteBlogPost(p.id); setFlash("Deleted ✓"); setBusy(false); }}} disabled={busy} className={btnDanger}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Steeped in Truth manager ────────────────────────────────────────────────────

function SteepedManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const val = (key: string) => (key in form ? form[key] : settings[key]) ?? "";
  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true);
    await updateSettings(form);
    setForm({}); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Steeped in Truth Settings</h2>
      <form onSubmit={save} className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Field label="Current Book"><input value={val("steeped_current_book")} onChange={e=>set("steeped_current_book",e.target.value)} className={inputCls} placeholder="Pilgrim's Progress" /></Field>
          <Field label="Current Author"><input value={val("steeped_current_author")} onChange={e=>set("steeped_current_author",e.target.value)} className={inputCls} placeholder="John Bunyan" /></Field>
          <Field label="Meeting Time"><input value={val("steeped_meeting_time")} onChange={e=>set("steeped_meeting_time",e.target.value)} className={inputCls} placeholder="Thursday nights at 7:00 PM EST" /></Field>
          <Field label="Contact Email"><input type="email" value={val("steeped_contact_email")} onChange={e=>set("steeped_contact_email",e.target.value)} className={inputCls} placeholder="tlcleon@gmail.com" /></Field>
        </div>
        <div className="space-y-5">
          <Field label="Past Readings (one per line)">
            <textarea value={val("steeped_past_readings")} onChange={e=>set("steeped_past_readings",e.target.value)} rows={6} className={areaCls} placeholder={"Mere Christianity — C. S. Lewis\nThe Pilgrim's Progress — John Bunyan"} />
          </Field>
          <p className="text-xs text-slate-ink">Enter each past reading on its own line.</p>
        </div>
        <div className="lg:col-span-2">
          <Row>
            <button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Changes"}</button>
            <Flash msg={flash} />
          </Row>
        </div>
      </form>
    </div>
  );
}

// ── Homepage settings manager ──────────────────────────────────────────────────

function HomepageManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const val = (key: string) => (key in form ? form[key] : settings[key]) ?? "";
  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true); await updateSettings(form);
    setForm({}); setFlash("Saved ✓"); setBusy(false);
  };

  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Homepage Content</h2>
      <p className="mt-2 text-sm text-slate-ink">Changes appear immediately on the live site after saving.</p>
      <form onSubmit={save} className="mt-6 space-y-6 max-w-2xl">
        <Field label="Hero Tagline">
          <textarea value={val("hero_tagline")} onChange={e=>set("hero_tagline",e.target.value)} rows={3} className={areaCls} placeholder="Defending truth. Pursuing wisdom…" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Scripture Quote">
            <input value={val("scripture_quote")} onChange={e=>set("scripture_quote",e.target.value)} className={inputCls} placeholder="Always be prepared to give an answer." />
          </Field>
          <Field label="Scripture Reference">
            <input value={val("scripture_reference")} onChange={e=>set("scripture_reference",e.target.value)} className={inputCls} placeholder="1 Peter 3:15" />
          </Field>
        </div>
        <Row>
          <button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Changes"}</button>
          <Flash msg={flash} />
        </Row>
      </form>
    </div>
  );
}

// ── Social Links manager ───────────────────────────────────────────────────────

function SocialLinksManager() {
  const { settings, updateSettings, loading, dbError } = useContent();
  const [form, setForm] = useState<Record<string,string>>({});
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useFlash();

  const val = (key: string) => (key in form ? form[key] : settings[key]) ?? "";
  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!Object.keys(form).length) return;
    setBusy(true); await updateSettings(form);
    setForm({}); setFlash("Saved — links updated sitewide ✓"); setBusy(false);
  };

  return (
    <div>
      {dbError && <DbError msg={dbError} />}
      <h2 className="font-display text-2xl text-navy">Social Links</h2>
      <p className="mt-2 text-sm text-slate-ink">These URLs appear in the nav, footer, podcast page, and contact page. Saving here updates them everywhere.</p>
      <form onSubmit={save} className="mt-6 max-w-xl space-y-5">
        <Field label="YouTube URL">
          <input type="url" value={val("youtube_url")} onChange={e=>set("youtube_url",e.target.value)} className={inputCls} placeholder="https://www.youtube.com/channel/…" />
        </Field>
        <Field label="Facebook URL">
          <input type="url" value={val("facebook_url")} onChange={e=>set("facebook_url",e.target.value)} className={inputCls} placeholder="https://www.facebook.com/…" />
        </Field>
        <Field label="Spotify Show URL">
          <input type="url" value={val("spotify_url")} onChange={e=>set("spotify_url",e.target.value)} className={inputCls} placeholder="https://open.spotify.com/show/…" />
        </Field>
        <Row>
          <button type="submit" disabled={busy||loading||!Object.keys(form).length} className={btnPrimary}>{busy?"Saving…":"Save Links"}</button>
          <Flash msg={flash} />
        </Row>
      </form>

      <div className="mt-10 rounded-2xl border border-border bg-sky/20 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-ink">Current live links</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><span className="text-gold">YouTube:</span> <a href={settings.youtube_url} target="_blank" rel="noreferrer" className="text-navy hover:text-gold break-all">{settings.youtube_url}</a></li>
          <li><span className="text-gold">Facebook:</span> <a href={settings.facebook_url} target="_blank" rel="noreferrer" className="text-navy hover:text-gold break-all">{settings.facebook_url}</a></li>
          <li><span className="text-gold">Spotify:</span> <a href={settings.spotify_url} target="_blank" rel="noreferrer" className="text-navy hover:text-gold break-all">{settings.spotify_url}</a></li>
        </ul>
      </div>
    </div>
  );
}

// ── Admin shell ────────────────────────────────────────────────────────────────

type Tab = "papers"|"library"|"podcast"|"events"|"blog"|"steeped"|"homepage"|"social";
const TABS: { id: Tab; label: string }[] = [
  { id:"papers",   label:"Seminary Papers" },
  { id:"library",  label:"Library" },
  { id:"podcast",  label:"Podcast" },
  { id:"events",   label:"Theology on Tap" },
  { id:"blog",     label:"Blog" },
  { id:"steeped",  label:"Steeped in Truth" },
  { id:"homepage", label:"Homepage" },
  { id:"social",   label:"Social Links" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [activeTab, setActiveTab] = useState<Tab>("papers");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  const logout = () => { localStorage.removeItem(AUTH_KEY); setAuthed(false); };

  return (
    <div className="min-h-screen bg-cloud">
      <header className="sticky top-0 z-40 border-b border-border bg-cloud/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/40 font-display text-base text-gold">M</span>
            <span className="font-display text-sm tracking-tight text-navy">Mars Hill <span className="text-gold">Admin</span></span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">← View site</Link>
            <button onClick={logout} className="text-xs uppercase tracking-[0.22em] text-slate-ink hover:text-navy">Sign out</button>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl overflow-x-auto px-6 lg:px-10">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] transition whitespace-nowrap ${activeTab===t.id ? "border-gold text-navy" : "border-transparent text-slate-ink hover:text-navy"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="rounded-3xl border border-border bg-white p-8 shadow-soft lg:p-12">
          {activeTab==="papers"   && <PapersManager />}
          {activeTab==="library"  && <LibraryManager />}
          {activeTab==="podcast"  && <PodcastManager />}
          {activeTab==="events"   && <EventsManager />}
          {activeTab==="blog"     && <BlogManager />}
          {activeTab==="steeped"  && <SteepedManager />}
          {activeTab==="homepage" && <HomepageManager />}
          {activeTab==="social"   && <SocialLinksManager />}
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.22em] text-slate-ink">
          Connected to Supabase · All changes are live instantly · Soli Deo Gloria
        </p>
      </main>
    </div>
  );
}
