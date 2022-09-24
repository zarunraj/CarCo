import { AfterContentInit, Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import flatpickr from 'flatpickr'
import { MessageService } from 'primeng/api'
import { switchMap, of } from 'rxjs'
import { Driver } from 'src/app/shared/models/driver'
import { VehicleType } from 'src/app/shared/models/vehicleType'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'
import { DriversService } from 'src/app/shared/services/rest_api/drivers.service'
import { VehicleTypeService } from 'src/app/shared/services/rest_api/vehicle-type.service'

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
  taxPhoto: any;

  drivers: Driver[]
  vehicleTypes: VehicleType[]
  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private driverService: DriversService,
    private messageService: MessageService,
    private vehicleTypeService: VehicleTypeService
  ) { }
  ngAfterContentInit(): void { }

  ngOnInit(): void {
    this.getVehicleId(() => {
      this.loadDrivers();
      this.loadVehicleTypes();
      this.loadVehicleDetails()
    })
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
      }
    })
  }

  loadVehicleTypes() {
    this.vehicleTypeService.getAll().subscribe({
      next: (data) => {
        this.vehicleTypes = data;
      }
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
         
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
        },
      })
  }

  onInsurancePhotoChange(event: any) {
    this.insurancePhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.insurancePhoto[0], this.vehicle.C_Id, 'insurance')
      .subscribe({
        next: (data) => {
         
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
        },
      })
  }
  onRCPhotoChange(event: any) {
    this.rcPhoto = [...event.addedFiles]
    this.carsService
      .uploadImage(this.rcPhoto[0], this.vehicle.C_Id, 'rcbook')
      .subscribe({
        next: (data) => {
          
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'image updated successfully',
          })
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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Saved successfully',
        })
        this.pageMode = 'view'
      },
    })
  }
}
