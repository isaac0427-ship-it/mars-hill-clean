import { createContext, useContext, useState } from "react";

export type PaperCategory = "Doctrine" | "World Religions" | "Culture" | "History" | "Philosophy";
export type BookEra = "Reformation" | "Puritan" | "Modern" | "Patristic" | "Apologetics";

export type Paper = {
  title: string;
  category: PaperCategory;
  year: string;
  summary: string;
  pdfUrl?: string;
};

export type Book = {
  title: string;
  author: string;
  era: BookEra;
  year: string;
  note: string;
};

export type Episode = {
  n: string;
  title: string;
  length: string;
};

export const DEFAULT_PAPERS: Paper[] = [
  { title: "The Arian Controversy", category: "History", year: "MMXX", summary: "On the fourth-century battle over the divinity of Christ and the Nicene response." },
  { title: "The Bible vs. the Qur'an", category: "World Religions", year: "MMXXI", summary: "A textual and theological comparison of two competing scriptural canons." },
  { title: "Critical Race Theory", category: "Culture", year: "MMXXII", summary: "A Reformed evaluation of CRT's underlying anthropology and worldview." },
  { title: "Islam — A Two-Page Summary", category: "World Religions", year: "MMXX", summary: "A concise primer on Islamic origins, theology, and key apologetic concerns." },
  { title: "The Kalam Cosmological Argument", category: "Philosophy", year: "MMXXII", summary: "On the classical theistic argument from the universe's beginning." },
  { title: "Matthew 25 — The Sheep & the Goats", category: "Doctrine", year: "MMXXI", summary: "Exegesis of the great judgment and the identity of 'the least of these.'" },
  { title: "Radical Two-Kingdom Theology", category: "Doctrine", year: "MMXXII", summary: "An examination and critique of the R2K project within Reformed circles." },
  { title: "Tacitus, The Annals 15:44", category: "History", year: "MMXX", summary: "Roman testimony to Christ and the early Christian movement." },
  { title: "The United Pentecostal Church", category: "Doctrine", year: "MMXXI", summary: "Modalism, oneness theology, and the historic doctrine of the Trinity." },
  { title: "Why God Allows Evil", category: "Philosophy", year: "MMXXIII", summary: "A theodicy rooted in the sovereignty and goodness of God." },
];

export const DEFAULT_BOOKS: Book[] = [
  { title: "Institutes of the Christian Religion", author: "John Calvin", era: "Reformation", year: "1559", note: "The cornerstone of Reformed systematic theology." },
  { title: "The Bondage of the Will", author: "Martin Luther", era: "Reformation", year: "1525", note: "The hinge of the Reformation — grace, will, and Scripture." },
  { title: "On the Incarnation", author: "Athanasius", era: "Patristic", year: "318", note: "The classic defense of the divinity of the Son." },
  { title: "Confessions", author: "Augustine", era: "Patristic", year: "400", note: "The soul laid bare before a sovereign God." },
  { title: "The Religious Affections", author: "Jonathan Edwards", era: "Puritan", year: "1746", note: "On the marks of true gracious affection in the soul." },
  { title: "Pilgrim's Progress", author: "John Bunyan", era: "Puritan", year: "1678", note: "An allegory of the Christian life — unrivaled." },
  { title: "The Mortification of Sin", author: "John Owen", era: "Puritan", year: "1656", note: "Be killing sin or it will be killing you." },
  { title: "Christianity and Liberalism", author: "J. Gresham Machen", era: "Modern", year: "1923", note: "A bracing defense of historic Christian faith." },
  { title: "The Inspiration and Authority of the Bible", author: "B. B. Warfield", era: "Modern", year: "1948", note: "Princeton's defense of Scripture." },
  { title: "Mere Christianity", author: "C. S. Lewis", era: "Apologetics", year: "1952", note: "Accessible Christian apologetics at its finest." },
  { title: "The Reason for God", author: "Timothy Keller", era: "Apologetics", year: "2008", note: "Apologetics for the skeptical and the seeking." },
  { title: "Reasonable Faith", author: "William Lane Craig", era: "Apologetics", year: "2008", note: "The Kalam argument and a rigorous case for theism." },
];

export const DEFAULT_EPISODES: Episode[] = [
  { n: "01", title: "Calvin on the Knowledge of God", length: "42 min" },
  { n: "02", title: "B.B. Warfield on Inspiration", length: "38 min" },
  { n: "03", title: "Luther's Bondage of the Will", length: "51 min" },
  { n: "04", title: "Machen — Christianity and Liberalism", length: "47 min" },
];

type ContentCtx = {
  papers: Paper[];
  books: Book[];
  episodes: Episode[];
  addPaper: (p: Paper) => void;
  deletePaper: (i: number) => void;
  resetPapers: () => void;
  addBook: (b: Book) => void;
  deleteBook: (i: number) => void;
  resetBooks: () => void;
  addEpisode: (e: Episode) => void;
  deleteEpisode: (i: number) => void;
  resetEpisodes: () => void;
};

const ContentContext = createContext<ContentCtx | null>(null);

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>(() => load("mha-papers", DEFAULT_PAPERS));
  const [books, setBooks] = useState<Book[]>(() => load("mha-books", DEFAULT_BOOKS));
  const [episodes, setEpisodes] = useState<Episode[]>(() => load("mha-episodes", DEFAULT_EPISODES));

  const addPaper = (p: Paper) => setPapers(prev => { const next = [...prev, p]; save("mha-papers", next); return next; });
  const deletePaper = (i: number) => setPapers(prev => { const next = prev.filter((_, idx) => idx !== i); save("mha-papers", next); return next; });
  const resetPapers = () => { save("mha-papers", DEFAULT_PAPERS); setPapers(DEFAULT_PAPERS); };

  const addBook = (b: Book) => setBooks(prev => { const next = [...prev, b]; save("mha-books", next); return next; });
  const deleteBook = (i: number) => setBooks(prev => { const next = prev.filter((_, idx) => idx !== i); save("mha-books", next); return next; });
  const resetBooks = () => { save("mha-books", DEFAULT_BOOKS); setBooks(DEFAULT_BOOKS); };

  const addEpisode = (e: Episode) => setEpisodes(prev => { const next = [...prev, e]; save("mha-episodes", next); return next; });
  const deleteEpisode = (i: number) => setEpisodes(prev => { const next = prev.filter((_, idx) => idx !== i); save("mha-episodes", next); return next; });
  const resetEpisodes = () => { save("mha-episodes", DEFAULT_EPISODES); setEpisodes(DEFAULT_EPISODES); };

  return (
    <ContentContext.Provider value={{
      papers, books, episodes,
      addPaper, deletePaper, resetPapers,
      addBook, deleteBook, resetBooks,
      addEpisode, deleteEpisode, resetEpisodes,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be inside ContentProvider");
  return ctx;
}
