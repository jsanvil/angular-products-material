import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const anonymousUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(UserService);

  if (loginService.isLogged()) {
    router.navigate(['/user/profile']);
    return false;
  }
  return true;
};
