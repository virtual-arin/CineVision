// Talks to the existing FastAPI backend. No backend changes.
const API_BASE = "https://cinevision-server.onrender.com";

export async function getApi(path, params) {
  const url = new URL(API_BASE + path);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API returned ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}
