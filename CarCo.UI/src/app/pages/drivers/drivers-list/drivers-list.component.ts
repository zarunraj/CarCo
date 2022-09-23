import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DriversService } from 'src/app/shared/services/rest_api/drivers.service'

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  drivers: any

  constructor(private driverService: DriversService, private router: Router) {}

  ngOnInit(): void {
    this.loadDrivers()
  }
  loadDrivers() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data.map((x:any) => {
          return { ...x, isLicenseExpiry: new Date(x.DrivingLicenseExpiryDate) <(new Date()) }
        })
      },
    })
  }

  navigateToDriverDetails(id: number) {
    this.router.navigateByUrl('drivers/' + id)
  }
  onRemoveDriverClick(id: number) {
    if (confirm('are you sure ?')) {
      this.driverService.deleteDriver(id).subscribe({
        next: (data) => {
          this.loadDrivers()
        },
      })
    }
  }
}
