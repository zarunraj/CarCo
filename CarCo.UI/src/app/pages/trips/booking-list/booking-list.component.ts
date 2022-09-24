import { Component, OnInit } from '@angular/core'
import { BookingService } from 'src/app/shared/services/rest_api/booking.service'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings = []
  displayBookingDetails = false
  selectedBooking: any

  constructor(private bookingService: BookingService, private carService:CarsService) {}

  ngOnInit(): void {
    this.loadBookings()
  }
  loadBookings() {
    this.bookingService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data
      },
    })
  }

  viewBookingDetails(trip: any) {
    this.selectedBooking = undefined
    this.displayBookingDetails = true
    this.selectedBooking = trip
  }

  getCarImage(){
    return this.carService.getImage(this.selectedBooking.C_Id, 'car')
  }
}
