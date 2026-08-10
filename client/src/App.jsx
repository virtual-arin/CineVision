import { useState } from "react";
import HomeView from "./views/HomeView.jsx";
import DetailsView from "./views/DetailsView.jsx";

export default function App() {
  // view: 'home' | 'details'
  const [view, setView] = useState("home");
  const [activeId, setActiveId] = useState(null);

  function openMovie(omdbId) {
    if (!omdbId) return;
    setActiveId(omdbId);
    setView("details");
  }

  function goHome() {
    setView("home");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  return (
    <div className="min-h-screen bg-bg pb-16 font-body text-cream">
      <header
        className="flex justify-center border-b border-line px-6 pb-8 pt-9"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(201, 162, 39, 0.22), transparent 55%), linear-gradient(180deg, rgba(122, 31, 43, 0.4) 0%, rgba(122, 31, 43, 0.05) 55%, transparent 100%), #16110D",
        }}
      >
        <div className="text-center">
          <span className="mb-[0.4rem] block font-display text-[0.8rem] uppercase tracking-[0.35em] text-gold">
            Now Showing
          </span>
          <h1
            className="m-0 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold uppercase tracking-[0.06em] text-cream"
            style={{ textShadow: "0 0 28px rgba(224, 193, 92, 0.35), 0 0 60px rgba(122, 31, 43, 0.25)" }}
          >
            Cine&nbsp;Vision
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6 pt-10">
        {view === "home" && <HomeView onOpen={openMovie} />}
        {view === "details" && <DetailsView omdbId={activeId} onOpen={openMovie} onBack={goHome} />}
      </main>
    </div>
  );
}
