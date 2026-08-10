import MovieCard from "./MovieCard.jsx";

export default function MovieGrid({ movies, onOpen }) {
  if (!movies || movies.length === 0) {
    return <div className="mt-4 min-h-[1.4rem] text-sm text-muted">No movies to show.</div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-[1.4rem]">
      {movies.map((m, i) => (
        <MovieCard key={(m.omdb_id || i) + "-" + i} movie={m} onOpen={onOpen} />
      ))}
    </div>
  );
}
