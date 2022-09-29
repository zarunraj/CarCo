import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LoginModel } from '../models/login-request-model'
import { CurrentUser } from '../models/user'
import { StorageService } from './storage.service'
import { Constants } from '../models/constants'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {}

  get CurrentUser(): CurrentUser | null {
    const user = this.storageService.get<CurrentUser>(Constants.userStorageKey)
    return user
  }

  public Login(loginModel: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }
    return this.httpClient.post(
      environment.apiUrl + 'api/ValidateLoginUser',
      loginModel,
      { headers },
    )
  }
}
