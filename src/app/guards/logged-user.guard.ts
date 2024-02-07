import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

// Comprueba si el usuario está logueado
export const loggedUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(UserService);

  if (!loginService.isLogged()) {
    router.navigate(['/user/login']);
    return false;
  }
  return true;
};

