import { useEffect, useState } from "react";
import { getApi } from "../api.js";
import StatusLine from "../components/StatusLine.jsx";
import DetailsHero from "../components/DetailsHero.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function DetailsView({ omdbId, onOpen, onBack }) {
  const [status, setStatus] = useState({ message: "", isError: false });
  const [details, setDetails] = useState(null);
  const [tfidfMovies, setTfidfMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [recsNote, setRecsNote] = useState("");

  useEffect(() => {
    if (!omdbId) return;

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });

    let cancelled = false;
    setDetails(null);
    setTfidfMovies([]);
    setGenreMovies([]);
    setRecsNote("");
    setStatus({ message: "Loading…", isError: false });

    (async () => {
      let data;
      try {
        data = await getApi(`/movie/id/${encodeURIComponent(omdbId)}`);
      } catch (err) {
        if (!cancelled) {
          setStatus({ message: `⚠️ Could not load this movie. ${err.message}`, isError: true });
        }
        return;
      }
      if (cancelled) return;

      setStatus({ message: "", isError: false });
      setDetails(data);

      const title = (data.title || "").trim();
      try {
        const bundle = await getApi("/movie/search", {
          query: title,
          tfidf_top_n: 10,
          genre_limit: 10,
        });
        if (cancelled) return;
        const tfidf = (bundle.tfidf_recommendations || []).map((x) => x.omdb).filter(Boolean);
        setTfidfMovies(tfidf);
        setGenreMovies(bundle.genre_recommendations || []);
      } catch {
        if (!cancelled) {
          setTfidfMovies([]);
          setGenreMovies([]);
          setRecsNote("No recommendations available.");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [omdbId]);

  return (
    <section>
      <button
        onClick={onBack}
        className="rounded-md border border-line bg-transparent px-4 py-[0.55rem] font-body text-[0.9rem] text-cream transition-colors hover:border-gold hover:text-gold-light"
      >
        &larr; Back to Home
      </button>

      <StatusLine message={status.message} isError={status.isError} />

      <DetailsHero data={details} />

      <h2 className="mb-[1.1rem] mt-10 border-l-4 border-gold pl-[0.9rem] font-display text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-cream">
        Similar Movies
      </h2>
      {recsNote ? <StatusLine message={recsNote} /> : <MovieGrid movies={tfidfMovies} onOpen={onOpen} />}

      <h2 className="mb-[1.1rem] mt-10 border-l-4 border-gold pl-[0.9rem] font-display text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-cream">
        More Like This
      </h2>
      {!recsNote && <MovieGrid movies={genreMovies} onOpen={onOpen} />}
    </section>
  );
}
