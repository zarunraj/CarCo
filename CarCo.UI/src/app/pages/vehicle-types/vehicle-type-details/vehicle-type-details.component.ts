import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap, of } from 'rxjs';
import { VehicleType } from 'src/app/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/shared/services/rest_api/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-details',
  templateUrl: './vehicle-type-details.component.html',
  styleUrls: ['./vehicle-type-details.component.css']
})
export class VehicleTypeDetailsComponent implements OnInit {
  VehicleTypeId: number;
  vehicleType: VehicleType;
  mode = 'view';

  constructor(
    private service: VehicleTypeService,
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.vehicleType = new VehicleType()

    this.getVehicleTypeId(() => {
      if (this.VehicleTypeId > 0) {
        this.loadVehicleTypeDetails(this.VehicleTypeId)
      } else {
        this.mode = 'edit'
      }
    })
  }



  loadVehicleTypeDetails(id: number) {
    this.service.getVehicleType(id).subscribe({
      next: (data) => {
        this.vehicleType = data
      },
      error: (err) => console.error(err),
    })
  }

  getVehicleTypeId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.VehicleTypeId = Number(d)
        callback()
      })
  }

  switchToEditMode() {
    this.mode = 'edit'
  }
  onSaveClick() {
    if (this.VehicleTypeId > 0) {
      this.service.edit(this.VehicleTypeId, this.vehicleType).subscribe({
        next: (data) => {
          this.vehicleType = data
          this.mode = 'view'
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
          this.router.navigateByUrl(`/vehicletypes`)
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error,
          })
        }
      })
    } else {
      this.service.save(this.vehicleType).subscribe({
        next: (data) => {
          this.vehicleType = data
          this.VehicleTypeId = data.ID
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
          this.router.navigateByUrl(`/vehicletypes`)
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error,
          })
        }
      })
    }
  }

}
