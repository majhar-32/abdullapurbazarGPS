/**
 * Helper utility to construct safe absolute URLs for API assets.
 * Handles cases where VITE_API_URL might be missing the protocol.
 */

export const getApiUrl = () => {
  let apiUrl = import.meta.env.VITE_API_URL;

  // Fallback if env var is missing or empty
  if (!apiUrl) {
    console.warn('VITE_API_URL is missing, using fallback.');
    apiUrl = 'https://schoolwebsite-production-8977.up.railway.app';
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
