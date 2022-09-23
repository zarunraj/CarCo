import { Component, OnInit } from '@angular/core'
import { ReviewsService } from 'src/app/shared/services/rest_api/reviews.service'

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  reviews: any
  constructor(private reviewService: ReviewsService) {}

  ngOnInit(): void {
    this.loadReviews()
  }
  loadReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data
      },
      error: (err) => console.error(),
    })
  }

  getMonthName(d: Date) {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    let dt = new Date(d)
    let name = month[dt.getMonth()]
    return name
  }
}
