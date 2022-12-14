import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { vehicle } from '../../models/vehicle'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class CarsService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  getCars() {
    const serviceUrl = `api/cars`
    return this.get(serviceUrl)
  }

  getCar(id: number) {
    const serviceUrl = `api/cars/` + id
    return this.get(serviceUrl)
  }

  addCar(model: vehicle) {
    const serviceUrl = `api/cars`
    return this.post(serviceUrl, model)
  }

  uploadImage(file: any, params: any) {
    const formData = new FormData()
    formData.append('file', file, file.name)
    Object.keys(params).filter(key => key != 'file').forEach(key => formData.append(key, params[key]))

    // formData.append('SelectedCarID', vehicleId.toString())
    // formData.append('DocumnetType', documnetType)

    return this.post('api/cars/photos', formData, {
      reportProgress: true,
      observe: 'events',
    })
  }

  updateCar(id: number, model: vehicle) {
    const serviceUrl = `api/cars/` + id
    return this.put(serviceUrl, model)
  }

  getImage(id: number, type: string) {
    const serviceUrl = `${environment.apiUrl}api/files/cars/${id}?type=${type}&key=${Math.random()}`
    return serviceUrl
  }

  deleteCar(id: number) {
    const serviceUrl = `api/cars/` + id
    return this.delete(serviceUrl)
  }
}
