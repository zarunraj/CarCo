import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SigninFacade } from 'src/app/shared/facade/signin-facade.service'
import { LoginModel } from 'src/app/shared/models/login-request-model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup
  submitted = false
  loginModel: LoginModel
  webresponse: any

  constructor(
    private router: Router,
    private signinFacade: SigninFacade,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  get f() {
    return this.form.controls
  }
  public onLoginClick(form: any) {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    this.signinFacade.login(form.value).subscribe((data) => {
      this.webresponse = data

      if (this.webresponse.UserTypeID == '0') {
        alert('Invalid Username and Password')
        this.router.navigate(['./login'])
      } else {
        this.router.navigate(['/dashboard'])
      }
    })
  }
}
