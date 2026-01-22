import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const user = authService.currentUser()

  return user?.role === 'ADMIN'
    ? true
    : router.navigate(['/tasks']);
};
