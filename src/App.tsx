import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Library from "./pages/Library";
import PapersPage from "./pages/Papers";
import PodcastPage from "./pages/Podcast";
import Resources from "./pages/Resources";
import SteepedInTruth from "./pages/SteepedInTruth";
import TheologyOnTap from "./pages/TheologyOnTap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/library" element={<Library />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/steeped-in-truth" element={<SteepedInTruth />} />
        <Route path="/theology-on-tap" element={<TheologyOnTap />} />
      </Routes>
    </BrowserRouter>
  );
}
