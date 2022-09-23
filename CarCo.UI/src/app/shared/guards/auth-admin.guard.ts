import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate()
  {
      if (localStorage.getItem('AdminUser'))
      {
          return true;
      }
      this.router.navigate(['./login']);
      return false;
  }
}
