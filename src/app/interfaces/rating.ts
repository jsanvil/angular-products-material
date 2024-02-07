import { IProduct, Product } from "./product";
import { IUser, User } from "./user";

export interface IRating {
  id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export class Rating implements IRating {
  id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;

  constructor() {
    this.productId = '';
    this.userId = '';
    this.rating = 0;
    this.comment = '';
    this.date = '';
  }
}

export interface IRatingWithUserAndProduct extends IRating {
  user: IUser;
}

export class RatingWithUserAndProduct implements IRatingWithUserAndProduct {
  id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
  user: IUser;
  product: IProduct;

  constructor() {
    this.productId = '';
    this.userId = '';
    this.rating = 0;
    this.comment = '';
    this.date = '';
    this.user = new User();
    this.product = new Product();
  }
}
