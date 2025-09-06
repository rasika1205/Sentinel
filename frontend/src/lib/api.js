// src/lib/api.js
const BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";
const TEAM = process.env.REACT_APP_TEAM_ID || "default";

async function jget(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  score: (range = "month") =>
    jget(`/api/score?teamId=${TEAM}&range=${range}`),

  trend: (range = "month") =>
    jget(`/api/trend?teamId=${TEAM}&range=${range}`),

  suggestions: () =>
    jget(`/api/suggestions?teamId=${TEAM}&range=current`),

  synchronous: (dateStr) =>
    jget(`/api/synchronous?teamId=${TEAM}&date=${dateStr}`),
};
