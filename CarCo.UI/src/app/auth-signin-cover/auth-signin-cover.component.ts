import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SigninFacade } from '../shared/facade/signin-facade.service';
import { LoginModel } from '../shared/models/login-request-model';

@Component({
  selector: 'app-auth-signin-cover',
  templateUrl: './auth-signin-cover.component.html',
  styleUrls: ['./auth-signin-cover.component.css'],
})
export class AuthSigninCoverComponent implements OnInit {

  constructor(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('AdminUser');
  }
  LoginModel: LoginModel = new LoginModel();
  webresponse: any;
  ngOnInit(): void {
  }
  

}
