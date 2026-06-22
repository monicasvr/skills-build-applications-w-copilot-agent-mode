/**
 * API utility module for OctoFit Tracker
 * 
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 * If not set, falls back to localhost:8000
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

const getBaseUrl = (): string => {
  if (!codespaceName) {
    console.warn('VITE_CODESPACE_NAME is not set. Using localhost fallback.');
    return 'http://localhost:8000';
  }
  return `https://${codespaceName}-8000.app.github.dev`;
};

const baseUrl = getBaseUrl();
const apiUrl = `${baseUrl}/api`;

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * Fetch data from the API
 * Handles both array and paginated responses
 */
export const fetchFromApi = async <T,>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  try {
    const url = `${apiUrl}${endpoint}`;
    console.log(`Fetching from: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`API fetch failed: ${message}`);
    return { error: message };
  }
};

/**
 * Post data to the API
 */
export const postToApi = async <T, R>(
  endpoint: string,
  payload: T
): Promise<ApiResponse<R>> => {
  try {
    const url = `${apiUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`API post failed: ${message}`);
    return { error: message };
  }
};

export default apiUrl;
