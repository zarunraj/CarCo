import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }
  getUser(userName: string) {
    let model = { Username: userName }
    const serviceUrl = `api/userdetails`
    return this.post(serviceUrl,model)
  }
}
