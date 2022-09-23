import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Constants } from '../models/constants'
import { LoginModel } from '../models/login-request-model'
import { LoginResultModel } from '../models/login-result-model'
import { CurrentUser } from '../models/user'
import { AuthenticationService } from '../services/authentication.service'
import { StorageService } from '../services/storage.service'

@Injectable({
  providedIn: 'root',
})
export class SigninFacade {
  loginModel: LoginModel
  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
  ) {}

  public login(loginModel: any): Observable<any> {
    return this.authenticationService.Login(loginModel).pipe(
      map((response) => {
        let webreposnse = response
        console.log(response)
        if (webreposnse != null) {
          var user = new CurrentUser()
          user.token = webreposnse.Token
          user.userName = loginModel.username
          user.userType = Number(webreposnse.UserTypeID)
          this.storageService.save(Constants.userStorageKey, user)

          if (webreposnse.UserTypeID == '2') {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({
                username: loginModel.username,
                token: webreposnse.Token,
              }),
            )
          } else if (webreposnse.UserTypeID == '1') {
            localStorage.setItem(
              'AdminUser',
              JSON.stringify({
                username: loginModel.username,
                token: webreposnse.Token,
              }),
            )
          }
          return webreposnse
        } else {
          return null
        }
      }),
    )
  }
}
