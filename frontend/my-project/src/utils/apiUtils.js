/**
 * Helper utility to construct safe absolute URLs for API assets.
 * Handles cases where VITE_API_URL might be missing the protocol.
 */

export const getApiUrl = () => {
  let apiUrl = import.meta.env.VITE_API_URL;

  // Check if running on deployed environment (not localhost)
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

  // If in production, force the production backend URL
  // This overrides any incorrect VITE_API_URL (like localhost) that might be set in Netlify
  // If in production, use the env var or fallback (but don't hardcode old backend)
  if (isProduction && !apiUrl) {
    console.warn('VITE_API_URL is missing in production!');
  }
  // Fallback for local development if env var is missing
  else if (!apiUrl) {
    apiUrl = 'http://localhost:5002';
  }

  // Trim whitespace
  apiUrl = apiUrl.trim();

  if (apiUrl.startsWith('http')) {
    return apiUrl;
  }
  return `https://${apiUrl}`;
};

export const getFileUrl = (path) => {
  if (!path) return '';

  // If already an absolute URL, return as is
  if (path.startsWith('http')) {
    return path;
  }

  const baseUrl = getApiUrl();

  // If path starts with /, append directly to base URL
  if (path.startsWith('/')) {
    return `${baseUrl}${path}`;
  }

  // Otherwise assume it's an upload and needs /uploads/ prefix
  return `${baseUrl}/uploads/${path}`;
};
