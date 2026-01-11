import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Allows access only when the user is authenticated.
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirects unauthenticated users to login, preserving the return URL.
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
