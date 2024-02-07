export interface IUser {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export class User implements IUser {
  id?: string;
  username: string = '';
  password: string = '';
  email: string = '';
  firstName: string;
  lastName: string;
  role: string = '';

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.role = '';
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
    return this.role === 'admin';
  }

  isUser(): boolean {
    return this.role === 'user';
  }

}
