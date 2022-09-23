import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Constants } from 'src/app/shared/models/constants'
import { AuthenticationService } from 'src/app/shared/services/authentication.service'
import { UserService } from 'src/app/shared/services/rest_api/user.service'
import { StorageService } from 'src/app/shared/services/storage.service'

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent implements OnInit {
  loggedInUser: any
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.CurrentUser
    this.userService.getUser(user?.userName || '').subscribe({
      next: (data) => {this.loggedInUser=data},
      error: (err) => {
        if (err.status == 401) {
          this.storageService.remove(Constants.userStorageKey)
          this.router.navigateByUrl('/login')
        }
      },
    })
  }

  onLogoutClick() {
    this.storageService.remove(Constants.userStorageKey)
    this.router.navigateByUrl('/login')
  }
}
