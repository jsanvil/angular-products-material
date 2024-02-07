import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Observer, catchError, map, throwError } from 'rxjs';
import { IImage } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imagesEndpoint = 'images';

  constructor(private http: HttpClient) { }

  createImage(image: IImage): Observable<IImage> {
    return this.http.post<IImage>(this.imagesEndpoint, image).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error adding image: ${resp.error.message}`)
        )
      ));
  }

  getImage(id: string): Observable<IImage> {
    return this.http.get<IImage>(`${this.imagesEndpoint}/${id}`).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error getting image with id ${id}: ${resp.error.message}`)
        )
      ));
  }

  updateImage(image: IImage): Observable<IImage> {
    return this.http.put<IImage>(`${this.imagesEndpoint}/${image.id}`, image).pipe(
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error updating image with id ${image.id}: ${resp.error.message}`)
        )
      ));
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete(`${this.imagesEndpoint}/${id}`).pipe(
      map(() => EMPTY),
      catchError((resp: HttpErrorResponse) =>
        throwError(() =>
          new Error(`Error deleting image with id ${id}: ${resp.error.message}`)
        )
      )
    );
  }

  setImage(image: IImage): Observable<IImage> {
    if (image.id) {
      if (image.url) {
        return this.updateImage(image);
      }
      else {
        return this.deleteImage(image.id);
      }
    } else {
      return this.createImage(image);
    }
  }

  getImages() {
    return this.http.get<IImage[]>(this.imagesEndpoint);
  }

}
