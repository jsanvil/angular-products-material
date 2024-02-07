import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEndpoint = 'users';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`this.usersEndpoint?_embed=image`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo usuarios. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  public getByUsername(username: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.usersEndpoint}?username=${username}&_embed=image`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  public login(user?: string, password?: string): Observable<IUser> {
    if (!user || !password) {
      throw new Error($localize`El usuario y la contraseña son requeridos`);
    }
    return this.getByUsername(user || '').pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo usuario. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ),
      map((user: IUser[]) => {
        if (user.length === 0) {
          throw new Error($localize`El usuario o la contraseña son incorrectos`);
        }
        return user[0]
      }),
      map((user: IUser) => {
        if (user.password !== password) {
          console.error(`user: ${user.password} !== password: ${password}`);
          throw new Error($localize`El usuario o la contraseña son incorrectos`);
        }
        user.password = '';
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      })
    );
  }

  public logout(): any {
    localStorage.removeItem('user');
  }

  public isLogged(): boolean {
    return localStorage.getItem('user') !== null;
  }

  public getUserLogged(): string {
    const user = this.getLoggedUser();
    return user.username;
  }

  public getName(): string {
    const user = this.getLoggedUser();
    return `${user.firstName}`;
  }

  public getFullName(): string {
    const user = this.getLoggedUser();
    return `${user.firstName} ${user.lastName}`;
  }

  public isAdmin(): boolean {
    const user = this.getLoggedUser();
    return user.role === 'admin';
  }

  private getLoggedUser(): IUser {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
