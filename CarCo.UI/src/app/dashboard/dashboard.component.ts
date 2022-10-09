import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarsService } from '../shared/services/rest_api/cars.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public carService: CarsService) { }

  params = { SelectedCarID: 20, DocumnetType: 'image' }

  uploadFn = () => this.carService.uploadImage;

  ngOnInit(): void {
  }

  onImageReady(event: any) {
    this.carService.uploadImage(event, this.params).subscribe((event: HttpEvent<any>) => {
   
    });
  }
}
