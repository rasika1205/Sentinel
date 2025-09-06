const API_BASE = "http://localhost:8000/auth"; // Flask backend

export function signup(username, password) {
  return fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(res => res.json());
}

export function login(username, password) {
  return fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(res => res.json());
}
