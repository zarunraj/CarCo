import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OffersService } from 'src/app/shared/services/rest_api/offers.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit {

 
  offers: any

  constructor(private offersService: OffersService, private router: Router) {}

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
    if (confirm('are you sure ?')) {
      this.offersService.deleteOffer(id).subscribe({
        next: (data) => {
          this.loadOffers();
        },
      })
    }
  }
}
