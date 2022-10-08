import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OffersService } from 'src/app/shared/services/rest_api/offers.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {


  offers: any

  constructor(private offersService: OffersService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadOffers()
  }
  loadOffers() {
    this.offersService.getOffers().subscribe({
      next: (data) => {
        this.offers = data
      },
    })
  }

  navigateToOfferDetails(id: number) {
    this.router.navigateByUrl('offers/' + id)
  }
  onRemoveOfferClick(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.offersService.deleteOffer(id).subscribe({
          next: (data) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Deleted",
            })
            this.loadOffers();
          },
        })
      }
    });
  }
}
