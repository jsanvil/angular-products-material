import { IImage } from "./image";

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export interface IUser {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  imageId?: string;
}

export class User implements IUser {
  id?: string;
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string;
  lastName: string;
  role: UserRole = UserRole.User;
  imageId?: string;
  image?: IImage;

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.role = UserRole.User;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value: string) {
    const parts = value.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }

  isAdmin(): boolean {
    return this.role === UserRole.Admin;
  }

  isUser(): boolean {
    return this.role === UserRole.User;
  }

}
