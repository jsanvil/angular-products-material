export interface IUser {
  id?: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export class User implements IUser {
  id?: string;
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = '';

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.role = '';
  }

  static clone(user: IUser): IUser {
    return { ...user };
  }

  static equals(user1: IUser, user2: IUser): boolean {
    return user1.id === user2.id;
  }

  static isValid(user: IUser): boolean {
    return user.username.length > 0 && user.password.length > 0 && user.email.length > 0;
  }

  static emptyUser(): IUser {
    return new User();
  }

  static compareByUsername(user1: IUser, user2: IUser): number {
    return user1.username.localeCompare(user2.username);
  }
}
