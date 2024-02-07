import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(UserService);

  if (loginService.getUserLogged() === 'admin') {
    return true;
  }
  return false;
};
