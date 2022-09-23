import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  getCustomers(){
    const serviceUrl = `api/customer`
    return this.get(serviceUrl)
  }

  getCustomer(id:number){
    const serviceUrl = `api/customer/${id}`
    return this.get(serviceUrl)
  }
}
