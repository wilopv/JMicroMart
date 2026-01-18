const rawApiBaseUrl = (window as { __env?: { API_BASE_URL?: string } }).__env?.API_BASE_URL || '';
const apiBaseUrl =
  rawApiBaseUrl && !/^https?:\/\//i.test(rawApiBaseUrl) ? `https://${rawApiBaseUrl}` : rawApiBaseUrl;

export const environment = {
  production: true,
  apiBaseUrl,
};
