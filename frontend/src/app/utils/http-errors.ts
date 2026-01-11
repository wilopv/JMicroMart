import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extracts a readable message from an HTTP error payload.
 */
export const extractHttpErrorMessage = (error: unknown): string => {
  if (error instanceof HttpErrorResponse) {
    const payload = error.error as { message?: string } | string | null;
    if (typeof payload === 'string' && payload.trim().length > 0) {
      return payload;
    }
    if (payload && typeof payload === 'object' && payload.message) {
      return payload.message;
    }
    return error.message;
  }
  return 'An unexpected error occurred';
};
