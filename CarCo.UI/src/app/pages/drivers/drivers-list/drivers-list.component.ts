import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { DriversService } from 'src/app/shared/services/rest_api/drivers.service'

@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css'],
})
export class DriversListComponent implements OnInit {
  drivers: any

  constructor(private driverService: DriversService, private router: Router
    ,private confirmationService: ConfirmationService,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.loadDrivers()
  }
  loadDrivers() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data.map((x: any) => {
          return { ...x, isLicenseExpiry: new Date(x.DrivingLicenseExpiryDate) < (new Date()) }
        })
      },
    })
  }

  navigateToDriverDetails(id: number) {
    this.router.navigateByUrl('drivers/' + id)
  }
  onRemoveDriverClick(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.driverService.deleteDriver(id).subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Deleted",
            })
            this.loadDrivers()
          },
        })
      }
    });
  }
}
