// API utility (JS) — uses Vite env variable VITE_CODESPACE_NAME
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const getBaseUrl = () => {
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000');
    return 'http://localhost:8000';
  }
  return `https://${codespaceName}-8000.app.github.dev`;
};

const baseUrl = getBaseUrl();
const apiUrl = `${baseUrl}/api`;

export async function fetchFromApi(endpoint) {
  try {
    const url = `${apiUrl}${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function postToApi(endpoint, payload) {
  try {
    const url = `${apiUrl}${endpoint}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export default apiUrl;
