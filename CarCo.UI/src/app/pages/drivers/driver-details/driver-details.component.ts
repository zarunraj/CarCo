import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import flatpickr from 'flatpickr'
import { MessageService } from 'primeng/api'
import { switchMap, of } from 'rxjs'
import { Driver } from 'src/app/shared/models/driver'
import { DriversService } from 'src/app/shared/services/rest_api/drivers.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css'],
})
export class DriverDetailsComponent implements OnInit {
  driverId: number
  driver: Driver
  mode = 'view'
  drivingLicenseUrl = ''
  driverProfilePhoto = ''
  constructor(
    private driverService: DriversService,
    private route: ActivatedRoute, private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.driver = new Driver()

    this.getDriverId(() => {
      if (this.driverId > 0) {
        this.loadDriverDetails(this.driverId)
      } else {
        this.mode = 'edit'
        this.bindControls()
      }
    })
  }
  bindControls() {
    setTimeout(() => {
      const options = {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
      }
      flatpickr('#dtpExpiry', options)
    }, 500)
  }
  loadDriverDetails(id: number) {
    this.driverService.getDriver(id).subscribe({
      next: (data) => {
        this.driver = data
        this.drivingLicenseUrl = `${environment.apiUrl}/api/driver/${this.driverId}/drivinglicense`
        this.setProfilePhotoUrl();
      },
      error: (err) => console.error(err),
    })
  }
  setProfilePhotoUrl() {
    this.driverProfilePhoto = 'assets/images/users/user-dummy-img.jpg'
    if (this.driver.ProfileImage) {
      setTimeout(() => {

        this.driverProfilePhoto = `${environment.apiUrl}/api/driver/${this.driverId}/profilePhoto?key=${Math.random()}`
      }, 500);
    }
  }

  getDriverId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.driverId = Number(d)
        callback()
      })
  }

  switchToEditMode() {
    this.mode = 'edit'
    this.bindControls()
  }
  onSaveClick() {
    if (this.driverId > 0) {
      this.driverService.edit(this.driverId, this.driver).subscribe({
        next: (data) => {
          this.driver = data
          this.mode = 'view'
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
        },error:(err)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error', 
          })
        }
      })
    } else {
      this.driverService.save(this.driver).subscribe({
        next: (data) => {
          this.driver = data
          this.driverId = data.ID
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
          this.setProfilePhotoUrl()
          this.router.navigateByUrl('drivers/' + this.driverId)
        },error:(err)=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Error', 
          })
        }
      })
    }
  }

  onDrivingLicensePhotoChange(event: any) {
    let image = event.target.files[0]

    this.driverService.uploadLicense(this.driverId, image).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Image Saved successfully',
        })
        this.drivingLicenseUrl = `${environment.apiUrl}/api/driver/${this.driverId}/drivinglicense`
      },
    })
  }

  onDriverPhotoChange(event: any) {
    let image = event.target.files[0]
    this.driverService.uploadDriverPhoto(this.driverId, image).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Image Saved successfully',
        })
        this.driver = data;
        this.setProfilePhotoUrl();
      },
    })
  }
}
