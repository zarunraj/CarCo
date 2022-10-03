import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import flatpickr from 'flatpickr';
import { MessageService } from 'primeng/api';
import { switchMap, of } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer';
import { OffersService } from 'src/app/shared/services/rest_api/offers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {


  offerId: number
  offer: Offer
  mode = 'view'
  drivingLicenseUrl = ''
  constructor(
    private offerService: OffersService,
    private route: ActivatedRoute, private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.offer = new Offer()

    this.getOfferId(() => {
      if (this.offerId > 0) {
        this.loadOfferDetails(this.offerId)
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
        minDate:new Date()
      }
      flatpickr('#dtpStartDate', options)
      flatpickr('#dtpEndDate', options)
    }, 500)
  }
  loadOfferDetails(id: number) {
    this.offerService.getOffer(id).subscribe({
      next: (data) => {
        this.offer = data
      },
      error: (err) => console.error(err),
    })
  }

  getOfferId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.offerId = Number(d)
        callback()
      })
  }

  switchToEditMode() {
    this.mode = 'edit'
    this.bindControls()
  }
  onSaveClick() {
    if (this.offerId > 0) {
      this.offerService.edit(this.offerId, this.offer).subscribe({
        next: (data) => {
          this.offer = data
          this.mode = 'view'
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
        },
      })
    } else {
      this.offerService.save(this.offer).subscribe({
        next: (data) => {
          this.offer = data
          this.offerId = data.ID
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
        },
      })
    }
  }

  onImageChange(event: any) {
    let image = event.target.files[0]

    this.offerService.uploadImage(this.offerId, image).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Uploaded successfully',
        })
      },
    })

  }

  getImage() {
    const serviceUrl = `${environment.apiUrl}/api/files/offers/${this.offerId}?key=${Math.random()}`
    return serviceUrl
  }
}
