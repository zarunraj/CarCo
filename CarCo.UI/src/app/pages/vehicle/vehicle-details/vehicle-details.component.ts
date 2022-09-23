import { AfterContentInit, Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import flatpickr from 'flatpickr'
import { switchMap, of } from 'rxjs'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit, AfterContentInit {
  vehicleId: number
  vehicle: any

  pageMode = 'view'
  vehiclePhoto: any[] = []
  insurancePhoto: any[] = []
  rcPhoto: any
  pollutionPhoto: any
  permitPhoto: any
  taxPhoto: any
  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
  ) {}
  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.getVehicleId(() => {
      this.loadVehicleDetails()
    })
  }

  bindControls() {
    const options = { altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d' }
    flatpickr('#dtpInsuranceExpiry', options)
    flatpickr('#dtpRCExpiry', options)
    flatpickr('#dtpPollutionExpiry', options)
    flatpickr('#dtpTaxExpiry', options)
  }
  getVehicleId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.vehicleId = Number(d)
        callback()
      })
  }

  loadVehicleDetails() {
    this.carsService.getCar(this.vehicleId).subscribe({
      next: (data) => {
        this.vehicle = data
      },
    })
  }

  onRemove(event: any) {
    console.log(event)
    this.vehiclePhoto.splice(this.vehiclePhoto.indexOf(event), 1)
  }

  onVehiclePhotoChange(event: any) {
    this.vehiclePhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.vehiclePhoto[0], this.vehicle.C_Id, 'car')
      .subscribe({
        next: (data) => {
          alert('uploaded vehicle photo')
        },
      })
  }

  onInsurancePhotoChange(event: any) {
    this.insurancePhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.insurancePhoto[0], this.vehicle.C_Id, 'insurance')
      .subscribe({
        next: (data) => {
          alert('uploaded insurance photo')
        },
      })
  }
  onRCPhotoChange(event: any) {
    this.rcPhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.rcPhoto[0], this.vehicle.C_Id, 'rcbook')
      .subscribe({
        next: (data) => {
          alert('uploaded RC photo')
        },
      })
  }
  onPollutionPhotoChange(event: any) {
    this.pollutionPhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.pollutionPhoto[0], this.vehicle.C_Id, 'pollution')
      .subscribe({
        next: (data) => {
          console.log('uploaded pollution photo')
        },
      })
  }

  onPermitPhotoChange(event: any) {
    this.permitPhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.permitPhoto[0], this.vehicle.C_Id, 'permit')
      .subscribe({
        next: (data) => {
          console.log('uploaded permit photo')
        },
      })
  }

  onTaxPhotoChange(event: any) {
    this.taxPhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.taxPhoto[0], this.vehicle.C_Id, 'tax')
      .subscribe({
        next: (data) => {
          console.log('uploaded permit photo')
        },
      })
  }

  getImage(type: string) {
    return this.carsService.getImage(this.vehicle.C_Id, type)
  }

  switchToEditMode() {
    this.pageMode = 'edit'
    setTimeout(() => {
      this.bindControls()
    }, 500)
  }

  onSaveClick() {
    this.carsService.updateCar(this.vehicle.C_Id, this.vehicle).subscribe({
      next: (data) => {
        alert('updated successfully!')
        this.pageMode = 'view'
      },
    })
  }
}
