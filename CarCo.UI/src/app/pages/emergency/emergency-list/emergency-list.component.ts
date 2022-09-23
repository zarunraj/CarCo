import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { EmergencyService } from 'src/app/shared/services/rest_api/emergency.service'

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.css'],
})
export class EmergencyListComponent implements OnInit {
  emergencies: any = []
  constructor(private service: EmergencyService, private route: Router) { }

  ngOnInit(): void {
    this.loadList();
  }
  loadList() {
    this.service.getAll().subscribe({
      next: (data) => this.emergencies = data
    })
  }

  navigateToEmeDetails(id: number) {
    this.route.navigateByUrl(`/emergency/${id}`)
  }
}
