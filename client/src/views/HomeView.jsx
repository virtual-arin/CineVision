import { useEffect, useRef, useState } from "react";
import { getApi } from "../api.js";
import StatusLine from "../components/StatusLine.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function HomeView({ onOpen }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("popular");
  const [status, setStatus] = useState({ message: "", isError: false });
  const [movies, setMovies] = useState([]);
  const debounceRef = useRef(null);

  const isSearching = query.trim().length >= 2;

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(runUpdate, isSearching ? 350 : 0);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  async function runUpdate() {
    const typed = query.trim();

    if (typed.length >= 2) {
      setStatus({ message: "Searching…", isError: false });
      try {
        const data = await getApi("/omdb/search", { query: typed });
        const results = (data && data.Search) || [];
        setStatus({ message: "", isError: false });
        setMovies(results);
      } catch (err) {
        setStatus({ message: `⚠️ Could not load search results. ${err.message}`, isError: true });
        setMovies([]);
      }
    } else {
      setStatus({ message: "Loading…", isError: false });
      try {
        const data = await getApi("/home", { category, limit: 20 });
        setStatus({ message: "", isError: false });
        setMovies(data);
      } catch (err) {
        setStatus({ message: `⚠️ Could not load the home feed. ${err.message}`, isError: true });
        setMovies([]);
      }
    }
  }

  return (
    <section>
      <div className="rounded-card border border-line bg-bg-elevated p-[1.1rem_1.3rem] shadow-card">
        <label
          className="mb-[0.6rem] block font-display text-[0.72rem] uppercase tracking-[0.12em] text-muted"
          htmlFor="search-input"
        >
          Find a title
        </label>
        <div className="flex flex-wrap items-center gap-[0.9rem] sm:flex-nowrap">
          <input
            id="search-input"
            type="text"
            autoComplete="off"
            placeholder="Type a movie name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-md border border-line bg-bg px-[0.9rem] py-[0.7rem] font-body text-base text-cream outline-none transition-colors placeholder:text-[#6b5d50] focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.18)]"
          />
          <div className="hidden h-7 flex-none border-l-2 border-dashed border-line sm:block" aria-hidden="true" />
          <select
            id="category-select"
            value={category}
            disabled={isSearching}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full flex-none cursor-pointer rounded-md border border-line bg-bg px-[0.9rem] py-[0.7rem] font-body text-[0.95rem] text-cream outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.18)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <option value="trending">Trending</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <StatusLine message={status.message} isError={status.isError} />

      <h2 className="mb-[1.1rem] mt-10 font-display text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-cream">
        {isSearching ? "Search Results" : "🏠 Home Feed"}
      </h2>

      <MovieGrid movies={movies} onOpen={onOpen} />
    </section>
  );
}
