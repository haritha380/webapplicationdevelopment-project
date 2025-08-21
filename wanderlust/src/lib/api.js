const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

export async function api(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const opts = { method, headers: { "Content-Type": "application/json", ...headers } };
  if (body) opts.body = JSON.stringify(body);
  if (auth) {
    const token = getToken();
    if (token) opts.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, opts);
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }

  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}
