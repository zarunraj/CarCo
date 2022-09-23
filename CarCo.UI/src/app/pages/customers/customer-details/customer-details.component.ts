import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap, of } from 'rxjs'
import { CustomersService } from 'src/app/shared/services/rest_api/customers.service'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customerId: number
  customer: any

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
  ) {}

  ngOnInit(): void {
    this.getCustomerId(() => {
      this.loadCustomerDetails(this.customerId)
    })
  }
  loadCustomerDetails(id: number) {
    this.customerService.getCustomer(id).subscribe({
      next: (data) => {
        this.customer = data
      },
      error: (err) => console.error(err),
    })
  }

  getCustomerId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.customerId = Number(d)
        callback()
      })
  }
}
