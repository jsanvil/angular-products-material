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
    return this.http.get<IProduct>(`${this.productsEndpoint}/${id}?_embed=image`).pipe(
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
}
