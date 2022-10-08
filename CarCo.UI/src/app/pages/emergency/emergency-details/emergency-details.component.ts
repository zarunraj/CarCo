import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { switchMap, of } from 'rxjs'
import { Emergency } from 'src/app/shared/models/Emergency'
import { EmergencyService } from 'src/app/shared/services/rest_api/emergency.service'

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.component.html',
  styleUrls: ['./emergency-details.component.css'],
})
export class EmergencyDetailsComponent implements OnInit {
  emergency: any
  emergencyId: any
  mode: string = 'view'

  constructor(
    private service: EmergencyService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.emergency = new Emergency()

    this.getEmergencyId(() => {
      if (this.emergencyId > 0) {
        this.loadEmergencyDetails(this.emergencyId)
      } else {
        this.mode = 'edit'
      }
    })
  }
  loadEmergencyDetails(id: number) {
    this.service.getEmergency(id).subscribe({
      next: (data) => {
        this.emergency = data
      },
      error: (err) => console.error(err),
    })
  }

  getEmergencyId(callback: Function) {
    return this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return of(params.get('id'))
        }),
      )
      .subscribe((d) => {
        this.emergencyId = Number(d)
        callback()
      })
  }

  switchToEditMode() {
    this.mode = 'edit'
  }
  onSaveClick() {
    if (this.emergencyId > 0) {
      this.service.edit(this.emergencyId, this.emergency).subscribe({
        next: (data) => {
          this.emergency = data
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
          this.mode = 'view'
          this.router.navigateByUrl(`/emergency`)
        },
      })
    } else {
      this.service.save(this.emergency).subscribe({
        next: (data) => {
          this.emergency = data
          this.emergencyId = data.ID
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Saved successfully',
          })
          this.router.navigateByUrl(`/emergency`)
        },
        error: (err) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error while saving'});
          console.log(err)
        },
      })
    }
  }
}
