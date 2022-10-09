import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/rest_api/api.service';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root',
})

export class DragdropService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  addFiles(images: File) {
    var arr: any[] = [];
    var formData = new FormData();
    arr.push(images);

    arr[0].forEach((item: any, i: any) => {
      formData.append('file', arr[0][i]);
    });

    return this
      .post(`api/cars/photos`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMgmt));
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}