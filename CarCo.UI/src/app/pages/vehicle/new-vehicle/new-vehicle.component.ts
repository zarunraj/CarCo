import { AfterContentInit, Component, OnInit } from '@angular/core'
import { vehicle } from 'src/app/shared/models/vehicle'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'

import flatpickr from 'flatpickr'
import { MessageService } from 'primeng/api'
import { Driver } from 'src/app/shared/models/driver'
import { VehicleType } from 'src/app/shared/models/vehicleType'
import { VehicleTypeService } from 'src/app/shared/services/rest_api/vehicle-type.service'
import { DriversService } from 'src/app/shared/services/rest_api/drivers.service'

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css'],
})
export class NewVehicleComponent implements OnInit, AfterContentInit {
  isSaved = false
  vehicle: vehicle = new vehicle()
  vehiclePhoto: any
  insurancePhoto: any
  rcPhoto: any
  pollutionPhoto: any
  permitPhoto: any
  taxPhoto: any

  drivers: Driver[]
  vehicleTypes: VehicleType[]

  constructor(private carsService: CarsService, private driverService: DriversService,
    private messageService: MessageService,
    private vehicleTypeService: VehicleTypeService) { }

  ngAfterContentInit(): void {
    document.querySelectorAll('.form-steps').forEach(function (n) {
      n.querySelectorAll('.nexttab').forEach(function (t) {
        n
          .querySelectorAll('button[data-bs-toggle="pill"]')
          .forEach(function (e) {
            e.addEventListener('show.bs.tab', function (e: any) {
              e.target.classList.add('done')
            })
          }),
          t.addEventListener('click', function () {
            var e = t.getAttribute('data-nexttab')
            document.getElementById(e || '')?.click()
          })
      }),
        n.querySelectorAll('.previestab').forEach(function (r: any) {
          r.addEventListener('click', function () {
            for (
              var e = r.getAttribute('data-previous'),
              t = r.closest('form').querySelectorAll('.custom-nav .done')
                .length,
              o = t - 1;
              o < t;
              o++
            )
              r.closest('form').querySelectorAll('.custom-nav .done')[o] &&
                r
                  .closest('form')
                  .querySelectorAll('.custom-nav .done')
                [o].classList.remove('done')
            document.getElementById(e)?.click()
          })
        })
      var l = n.querySelectorAll('button[data-bs-toggle="pill"]')
      l.forEach(function (o, r) {
        o.setAttribute('data-position', r.toString()),
          o.addEventListener('click', function () {
            if (o.getAttribute('data-progressbar')) {
              let e =
                (document
                  .getElementById('custom-progress-bar')
                  ?.querySelectorAll('li')?.length || 0) - 1
              e = (r / e) * 100
              let bar = document.getElementById('custom-progress-bar')
              if (bar) {
                ; (bar.querySelector('.progress-bar') as any).style.width =
                  e + '%'
              }
              0 < n.querySelectorAll('.custom-nav .done').length &&
                n.querySelectorAll('.custom-nav .done').forEach(function (e) {
                  e.classList.remove('done')
                })
              for (var t = 0; t <= r; t++)
                l[t].classList.contains('active')
                  ? l[t].classList.remove('done')
                  : l[t].classList.add('done')
            }
          })
      })
    })

    let calendarOptions = {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d', minDate: new Date()
    }
    flatpickr('#dtpInsuranceExpiry', calendarOptions)
    flatpickr('#dtpRCExpiry', calendarOptions)
    flatpickr('#dtpPollutionExpiry', calendarOptions)
    flatpickr('#dtpTaxExpiry', calendarOptions)
  }

  ngOnInit(): void {
    this.loadDrivers();
    this.loadVehicleTypes();
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

  validateTab1() {
    let flag = true;
    if (!this.vehicle.Registration_Number) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Registration Number is required'
      })
    }
    if (!this.vehicle.Model_Name) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Model name is required'
      })
    }

    if (!this.vehicle.Brand) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Brand is required'
      })
    }
    if (!this.vehicle.Fueltype) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Fuel type is required'
      })
    }
    if (!this.vehicle.No_of_Pas) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'No. of passengers is required'
      })
    }
    if (!this.vehicle.VehicleTypeID) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Vehicle type is required'
      })
    }
    if (!this.vehicle.DriverID) {
      flag = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Driver is required'
      })
    }
    return flag;
  }
  onbtnSaveandContinueClick() {
    if (!this.validateTab1())
      return;
    this.carsService.addCar(this.vehicle).subscribe({
      next: (data) => {
        this.vehicle = data
        this.isSaved = true
        setTimeout(() => {
          document.getElementById('btnContinue')?.click()
        }, 500)
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: "Something went wrong! Please try again.",
        })
      },
    })
  }

  onVehiclePhotoChange(event: any) {
    this.vehicle.Image = null;
    this.carsService
      .uploadImage(event.target.files[0], this.vehicle.C_Id, 'car')
      .subscribe({
        next: (data) => {
          this.vehicle = data
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded vehicle photo', })
        },
      })
  }

  onInsurancePhotoChange(event: any) {
    this.insurancePhoto = event.target.files[0]
    this.vehicle.Insurance_Image = null;
    this.carsService
      .uploadImage(this.insurancePhoto, this.vehicle.C_Id, 'insurance')
      .subscribe({
        next: (data) => {
          this.vehicle = data;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded insurance photo', })

        },
      })
  }
  onRCPhotoChange(event: any) {
    this.rcPhoto = event.target.files[0]
    this.vehicle.RC_Book_Image = null;
    this.carsService
      .uploadImage(this.rcPhoto, this.vehicle.C_Id, 'rcbook')
      .subscribe({
        next: (data) => {
          this.vehicle = data
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded RC photo', })
        },
      })
  }
  onPollutionPhotoChange(event: any) {
    this.pollutionPhoto = event.target.files[0]
    this.vehicle.Pollution_Certificate = null;
    this.carsService
      .uploadImage(this.pollutionPhoto, this.vehicle.C_Id, 'pollution')
      .subscribe({
        next: (data) => {
          this.vehicle = data
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded pollution photo', })

        },
      })
  }

  onPermitPhotoChange(event: any) {
    this.permitPhoto = event.target.files[0]
    this.vehicle.Permit_Image = null;
    this.carsService
      .uploadImage(this.permitPhoto, this.vehicle.C_Id, 'permit')
      .subscribe({
        next: (data) => {
          this.vehicle = data
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded permit photo', })
        },
      })
  }

  onTaxPhotoChange(event: any) {
    this.taxPhoto = event.target.files[0]
    this.vehicle.Tax_Image = null;
    this.carsService
      .uploadImage(this.taxPhoto, this.vehicle.C_Id, 'tax')
      .subscribe({
        next: (data) => {
          this.vehicle = data
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Tax photo', })
        },
      })
  }

  updateVehicle() {
    this.carsService.updateCar(this.vehicle.C_Id, this.vehicle).subscribe({
      next: (data) => {
        this.vehicle = data
        console.log('vehicle updated')
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  getImage(type: string) {
    return this.carsService.getImage(this.vehicle.C_Id, type)
  }
}
