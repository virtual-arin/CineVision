export default function StatusLine({ message, isError = false }) {
  return (
    <div
      role="status"
      className={`mt-4 min-h-[1.4rem] text-sm ${isError ? "text-[#E38B8B]" : "text-muted"}`}
    >
      {message || ""}
    </div>
  );
}
