import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  if (loginService.getUserLogged() === 'admin') {
    return true;
  }
  return false;
};
