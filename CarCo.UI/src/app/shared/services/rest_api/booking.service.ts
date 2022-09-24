import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class BookingService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  getBookings() {
    const serviceUrl = `api/AllBookingList`
    return this.get(serviceUrl)
  }
}
