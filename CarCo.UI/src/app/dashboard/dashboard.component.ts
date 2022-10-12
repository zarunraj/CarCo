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
 

  ngOnInit(): void {
  }
 
}
