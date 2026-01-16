export const environment = {
  production: true,
  apiBaseUrl: (window as { __env?: { API_BASE_URL?: string } }).__env?.API_BASE_URL || '',
};
