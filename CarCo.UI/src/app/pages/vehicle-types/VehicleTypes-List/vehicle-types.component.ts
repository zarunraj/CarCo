import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VehicleType } from 'src/app/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/shared/services/rest_api/vehicle-type.service';

@Component({
  selector: 'app-vehicle-types',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.css']
})
export class VehicleTypesComponent implements OnInit {
  vehicleTypes: Array<VehicleType> = [];

  constructor(private service: VehicleTypeService,
    private confirmationService: ConfirmationService,
    private route: Router
    , private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadList()

  }


  navigateToAddVehicleType(id: number) {
    this.route.navigateByUrl(`/vehicletypes/${id}`)
  }

  loadList() {
    this.service.getAll().subscribe({
      next: (data) => this.vehicleTypes = data
    })
  }

  onRemoveVehicleTypeClick(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.service.deleteVehicleType(id).subscribe({
          next: (result) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: "Deleted",
            })
            this.loadList()
          },
          error: (err) => {
          
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: "Can't delete",
              })
           
          },
        })
      }
    });

  }
}
