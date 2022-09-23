import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { CarsService } from 'src/app/shared/services/rest_api/cars.service'

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: any[]
  constructor(private carsService: CarsService, private router: Router) {}

  ngOnInit(): void {
    this.loadVehicles()
  }

  loadVehicles() {
    this.carsService.getCars().subscribe({
      next: (data) => {
        this.vehicles = data
      },
    })
  }

  navigateToVehicleDetails(id: number) {
    this.router.navigateByUrl('/vehicles/' + id)
  }

  navigateToAddVehicle() {
    this.router.navigateByUrl('/newvehicles')
  }

  onRemoveVehicleClick(id: number) {
    if (confirm('Are you sure ?')) {
      this.carsService.deleteCar(id).subscribe({
        next: (result) => {
          this.loadVehicles()
        },
        error: (err) => {
          console.log(err)
        },
      })
    }
  }
}
