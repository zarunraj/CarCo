import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class ReviewsService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }
  getReviews() {
    const serviceUrl = `api/reviews`
    return this.get(serviceUrl)
  }
}
