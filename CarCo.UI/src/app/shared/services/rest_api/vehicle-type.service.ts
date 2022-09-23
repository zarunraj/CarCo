import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { AuthenticationService } from '../authentication.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }
  getAll() {
    const serviceUrl = `api/VehicleType`
    return this.get(serviceUrl)
  }
  getVehicleType(id:number){
    const serviceUrl = `api/VehicleType/${id}`
    return this.get(serviceUrl)
  }
  edit(id: number, vehicleType:VehicleType) {
    const serviceUrl = `api/VehicleType/${id}`
    return this.put(serviceUrl, vehicleType)
  }
  save(vehicleType: VehicleType) {
    const serviceUrl = `api/VehicleType`
    return this.post(serviceUrl, vehicleType)
  }

 

  deleteVehicleType(id: number) {
    const serviceUrl = `api/VehicleType/${id}`
    return this.delete(serviceUrl)
  }
}
