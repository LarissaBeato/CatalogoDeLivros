import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
