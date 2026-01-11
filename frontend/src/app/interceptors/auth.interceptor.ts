import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_STORAGE_KEY = 'token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Adds the Authorization header when a JWT token is available in localStorage.
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
