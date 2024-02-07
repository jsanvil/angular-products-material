import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRating, IRatingWithUserAndProduct } from '../interfaces/rating';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratingsEndpoint = 'ratings';

  constructor(private http: HttpClient) { }

  getProductRatings(productId: Observable<IRatingWithUserAndProduct>) {
    return this.http.get(`${this.ratingsEndpoint}?_embed=user&productId=${productId}`)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            new Error(`Error obteniendo valoraciones. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
        ));
  }

  getUserRatings(userId: Observable<IRatingWithUserAndProduct>) {
    return this.http.get(`${this.ratingsEndpoint}?_embed=product&userId=${userId}`)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            new Error(`Error obteniendo valoraciones. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
        ));
  }

  addRating(rating: Observable<IRating>) {
    return this.http.post(this.ratingsEndpoint, rating)
      .pipe(
        catchError((resp: HttpErrorResponse) =>
          throwError(() =>
            new Error(`Error añadiendo valoración. Código de servidor: ${resp.status}. Mensaje: ${resp.message}`))
        ));
  }

}
