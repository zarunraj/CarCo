import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Driver } from '../../models/driver'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class DriversService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  getDrivers() {
    const serviceUrl = `api/driver`
    return this.get(serviceUrl)
  }

  getDriver(id: number) {
    const serviceUrl = `api/driver/${id}`
    return this.get(serviceUrl)
  }

  edit(id: number, driver: Driver) {
    const serviceUrl = `api/driver/${id}`
    return this.put(serviceUrl, driver)
  }
  save(driver: Driver) {
    const serviceUrl = `api/driver`
    return this.post(serviceUrl, driver)
  }

  uploadLicense(driverId: number, image: any) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('SelectedDriverID', driverId.toString())
    formData.append('DocumnetType', 'license')

    return this.post('api/driver/upload', formData)
  }

  uploadDriverPhoto(driverId: number, image: any) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('SelectedDriverID', driverId.toString())
    formData.append('DocumnetType', 'profile')

    return this.post('api/driver/upload', formData)
  }

  deleteDriver(id: number) {
    const serviceUrl = `api/driver/${id}`
    return this.delete(serviceUrl)
  }
}
