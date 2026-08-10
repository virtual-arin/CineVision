import { useEffect, useState } from "react";

export default function DetailsHero({ data }) {
  const poster = data ? data.poster_url : null;

  // OMDB poster URLs sometimes 404 even when present in the data.
  // Fall back to the placeholder instead of a broken image icon.
  const [posterFailed, setPosterFailed] = useState(false);
  useEffect(() => {
    setPosterFailed(false);
  }, [poster]);

  if (!data) return null;

  const genres = (data.genres || []).map((g) => g.name).join(", ") || "-";
  const showPoster = poster && !posterFailed;

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[260px_1fr]">
      {showPoster ? (
        <div className="aspect-[2/3] w-full overflow-hidden rounded-card border border-line bg-bg-elevated shadow-card">
          <img
            src={poster}
            alt={data.title || ""}
            className="block h-full w-full object-cover"
            onError={() => setPosterFailed(true)}
          />
        </div>
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center rounded-card border border-line bg-bg-elevated font-display text-[0.85rem] uppercase tracking-[0.08em] text-muted shadow-card">
          🖼️ No poster
        </div>
      )}

      <div>
        <h2 className="m-0 mb-[0.7rem] font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase tracking-[0.04em] text-cream">
          {data.title || ""}
        </h2>

        <p className="my-[0.35rem] text-[0.92rem] text-muted">
          <strong className="font-semibold text-gold">Release:</strong> {data.release_date || "-"}
        </p>

        <p className="my-[0.35rem] text-[0.92rem] text-muted">
          <strong className="font-semibold text-gold">Genres:</strong> {genres}
        </p>

        <div className="mb-1.5 mt-[1.1rem] font-display text-[0.78rem] uppercase tracking-[0.1em] text-gold">
          Overview
        </div>
        <p className="max-w-[65ch] text-[0.96rem] leading-[1.55rem] text-cream">
          {data.overview || "No overview available."}
        </p>
      </div>
    </div>
  );
}
