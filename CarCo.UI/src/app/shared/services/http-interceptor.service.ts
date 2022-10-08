import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, pipe, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {

        if (error.status == 401) {
          this.router.navigateByUrl('/login')
        }
        return throwError(error)
      }))
  }
}
