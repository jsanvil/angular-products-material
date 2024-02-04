import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IProduct } from '../interfaces/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsEndpoint = 'products';

  constructor(private http: HttpClient) { }

  // obtiene todos los productos
  // GET /products
  getProducts(): Observable<IProduct[]> {
    return this.http.get<Array<IProduct>>(this.productsEndpoint).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo) productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // obtiene un producto
  // GET /products/:id
  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.productsEndpoint}/${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // agrega un producto
  // POST /products
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.productsEndpoint, product).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
        new Error(`Error crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // actualiza un producto
  // PUT /products/:id
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.productsEndpoint}/${product.id}`, product).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al actualizar producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // elimina un producto
  // DELETE /products/:id
  deleteProduct(id: string): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.productsEndpoint}/${id}`);
  }

  // actualiza el rating de un producto
  // PATCH /products/:id { rating: number }
  updateRating(id: string, rating: number): Observable<IProduct> {
    return this.http.patch<IProduct>(`${this.productsEndpoint}/${id}`, { rating }).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al actualizar rating. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // getProducts(): Product[] {
  //   return [{
  //     id: 1,
  //     description: 'WD BLACK SN770 2TB NVMe SSD',
  //     available: '2023-10-03',
  //     price: 115,
  //     imageUrl: 'assets/ssd.jpg',
  //     rating: 5
  //   }, {
  //     id: 2,
  //     description: 'MSI MPG B550 GAMING PLUS',
  //     available: '2023-09-15',
  //     price: 139.90,
  //     imageUrl: 'assets/motherboard.png',
  //     rating: 4
  //   },
  //   {
  //     id: 3,
  //     description: 'Kingston FURY Beast DDR4 3200 MHz 16GB 2x8GB CL16',
  //     available: '2023-11-10',
  //     price: 42.95,
  //     imageUrl: 'assets/ram.png',
  //     rating: 3
  //   }];
  // }
}
