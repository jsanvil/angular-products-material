import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  public login(user?: string, password?: string): Observable<boolean> {
    // Simulate a server request
    return new Observable<boolean>(observer => {
      if (!user || !password) {
        observer.error('User and password are required');
        return;
      }
      const isAdmin = user === 'admin' && password === 'admin';
      const isUser = user === 'user' && password === 'user';
      if (isAdmin || isUser) {
        localStorage.setItem('username', user);
        observer.next(true);
        observer.complete();
      }
      else {
        observer.error('User or password are incorrect');
      }
    });
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
