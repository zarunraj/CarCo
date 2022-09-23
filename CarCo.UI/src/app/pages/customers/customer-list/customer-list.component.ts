import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CustomersService } from 'src/app/shared/services/rest_api/customers.service'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: any[]
  constructor(private customerService: CustomersService
    , private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers()
  }
  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data
      },
      error: (err) => console.error(err),
    })
  }
  navigateToCustomerDetails(id:number){
    this.router.navigateByUrl('/customers/' + id)
  }
}
