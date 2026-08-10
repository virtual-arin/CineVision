import { useState } from "react";

// Backend always returns normalized cards: omdb_id / title / poster_url.
export default function MovieCard({ movie, onOpen }) {
  const omdbId = movie.omdb_id || "";
  const title = movie.title || "Untitled";
  const poster = movie.poster_url || null;

  // OMDB poster URLs sometimes 404 even when present in the data.
  // Fall back to the placeholder instead of a broken image icon.
  const [posterFailed, setPosterFailed] = useState(false);
  const showPoster = poster && !posterFailed;

  const trigger = () => onOpen(omdbId);

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-bg-card shadow-card cursor-pointer transition-transform duration-[180ms] ease-out hover:-translate-y-1 hover:border-gold focus-visible:-translate-y-1 focus-visible:border-gold focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      tabIndex={0}
      role="button"
      aria-label={`Open ${title}`}
      onClick={trigger}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger();
        }
      }}
    >
      {showPoster ? (
        <div className="relative h-[230px] w-full overflow-hidden bg-[#120E0A]">
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="block h-full w-full object-cover"
            onError={() => setPosterFailed(true)}
          />
        </div>
      ) : (
        <div className="flex h-[230px] w-full items-center justify-center bg-[#120E0A] p-4 text-center font-display text-xs uppercase tracking-wider text-muted">
          No Poster
        </div>
      )}

      <div className="mc-perf" />

      <div className="flex flex-1 flex-col gap-1.5 px-[0.85rem] pb-[0.85rem] pt-[0.7rem]">
        <div className="mc-title-clamp h-10 text-[0.86rem] font-medium leading-5 text-cream">
          {title}
        </div>
        <div className="mt-auto self-start font-display text-[0.7rem] uppercase tracking-[0.1em] text-muted transition-colors group-hover:text-gold-light group-focus-visible:text-gold-light">
          Open ticket &rarr;
        </div>
      </div>
    </div>
  );
}
