import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Product } from '../interfaces/product';
import { ResponseProducts } from '../interfaces/responses';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsEndpoint = 'products';

  constructor(private http: HttpClient) { }

  // obtiene todos los productos
  // GET /products
  getProducts(): Observable<Product[]> {
    return this.http.get<Array<Product>>(this.productsEndpoint).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo) productos. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // obtiene un producto
  // GET /products/:id
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsEndpoint}/${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error obteniendo producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // agrega un producto
  // POST /products
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsEndpoint, product).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
        new Error(`Error crear producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // actualiza un producto
  // PUT /products/:id
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsEndpoint}/${product.id}`, product).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error al actualizar producto. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
      ));
  }

  // elimina un producto
  // DELETE /products/:id
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.productsEndpoint}/${id}`);
  }

  // actualiza el rating de un producto
  // PATCH /products/:id { rating: number }
  updateRating(id: number, rating: number): Observable<Product> {
    return this.http.patch<Product>(`${this.productsEndpoint}/${id}`, { rating }).pipe(
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
