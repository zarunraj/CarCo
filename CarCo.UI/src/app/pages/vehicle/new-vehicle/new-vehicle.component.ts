import { AfterContentInit, Component, OnInit } from '@angular/core'
import { vehicle } from 'src/app/shared/models/vehicle'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'

import flatpickr from 'flatpickr'

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.css'],
})
export class NewVehicleComponent implements OnInit, AfterContentInit {
  isSaved = false
  vehicle: any = new vehicle()
  vehiclePhoto: any
  insurancePhoto: any
  rcPhoto: any
  pollutionPhoto: any
  permitPhoto: any
  taxPhoto: any

  constructor(private carsService: CarsService) {}

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
                ;(bar.querySelector('.progress-bar') as any).style.width =
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

    flatpickr('#dtpInsuranceExpiry', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
    })
    flatpickr('#dtpRCExpiry', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
    })
    flatpickr('#dtpPollutionExpiry', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
    })

    flatpickr('#dtpTaxExpiry', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
    })
  }

  ngOnInit(): void {}

  onbtnSaveandContinueClick() {
    console.log(this.vehicle)
    this.carsService.addCar(this.vehicle).subscribe({
      next: (data) => {
        this.vehicle = data
        this.isSaved = true
        setTimeout(() => {
          document.getElementById('btnContinue')?.click()
        }, 500)
      },
      error: (err) => {
        alert('error')
      },
    })
  }

  onVehiclePhotoChange(event: any) {
    this.vehiclePhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.vehiclePhoto, this.vehicle.C_Id, 'car')
      .subscribe({
        next: (data) => {
          alert('Uploaded vehicle photo')
        },
      })
  }

  onInsurancePhotoChange(event: any) {
    this.insurancePhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.insurancePhoto, this.vehicle.C_Id, 'insurance')
      .subscribe({
        next: (data) => {
          alert('Uploaded insurance photo')
        },
      })
  }
  onRCPhotoChange(event: any) {
    this.rcPhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.rcPhoto, this.vehicle.C_Id, 'rcbook')
      .subscribe({
        next: (data) => {
        alert('Uploaded RC photo')
        },
      })
  }
  onPollutionPhotoChange(event: any) {
    this.pollutionPhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.pollutionPhoto, this.vehicle.C_Id, 'pollution')
      .subscribe({
        next: (data) => {
          alert('Uploaded pollution photo')
        },
      })
  }

  onPermitPhotoChange(event: any) {
    this.permitPhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.permitPhoto, this.vehicle.C_Id, 'permit')
      .subscribe({
        next: (data) => {
         alert('Uploaded permit photo')
        },
      })
  }

  onTaxPhotoChange(event: any) {
    this.taxPhoto = event.target.files[0]
    this.carsService
      .uploadImage(this.taxPhoto, this.vehicle.C_Id, 'tax')
      .subscribe({
        next: (data) => {
          alert('Uploaded Tax photo')
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
}
