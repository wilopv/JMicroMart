const TOKEN_STORAGE_KEY = 'token';

/**
 * Reads the persisted JWT token from localStorage.
 */
export const readToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

/**
 * Persists the JWT token in localStorage.
 */
export const writeToken = (token: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

/**
 * Clears the stored JWT token from localStorage.
 */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
