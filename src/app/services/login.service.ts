import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  public login(user?: string, password?: string): boolean {
    if (user === 'admin' && password === 'admin') {
      localStorage.setItem('username', user);
      return true;
    }
    return false;
  }

  public logout(): any {
    localStorage.removeItem('username');
  }

  public isLogged(): boolean {
    return localStorage.getItem('username') !== null;
  }

  public getUserLogged(): string {
    return localStorage.getItem('username') || '';
  }
}
