export interface IProduct {
  id?: string;
  description: string;
  price: number;
  available: string;
  imageUrl: string;
  rating: number;
}

export class Product implements IProduct {
  id?: string;
  description: string = '';
  price: number = 0;
  available: string = '';
  imageUrl: string = '';
  rating: number = 0;

  constructor() {
    this.description = '';
    this.price = 0;
    this.available = '';
    this.imageUrl = '';
    this.rating = 0;
  }

  static clone(product: IProduct): IProduct {
    return { ...product };
  }

  static equals(product1: IProduct, product2: IProduct): boolean {
    return product1.id === product2.id;
  }

  static isValid(product: IProduct): boolean {
    return product.description.length > 0 && product.price > 0;
  }

  static emptyProduct(): IProduct {
    return new Product();
  }

  static compareByPrice(product1: IProduct, product2: IProduct): number {
    return product1.price - product2.price;
  }

  static compareByRating(product1: IProduct, product2: IProduct): number {
    return product2.rating - product1.rating;
  }

  static compareByAvailable(product1: IProduct, product2: IProduct): number {
    return new Date(product2.available).getTime() - new Date(product1.available).getTime();
  }

  static compareByDescription(product1: IProduct, product2: IProduct): number {
    return product1.description.localeCompare(product2.description);
  }
}
