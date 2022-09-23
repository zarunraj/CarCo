import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Emergency } from '../../models/Emergency'
import { AuthenticationService } from '../authentication.service'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class EmergencyService extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }
  getAll() {
    const serviceUrl = `api/emergency`
    return this.get(serviceUrl)
  }
  getEmergency(id:number){
    const serviceUrl = `api/emergency/${id}`
    return this.get(serviceUrl)
  }
  edit(id: number, emergency:Emergency) {
    const serviceUrl = `api/emergency/${id}`
    return this.put(serviceUrl, emergency)
  }
  save(emergency: Emergency) {
    const serviceUrl = `api/emergency`
    return this.post(serviceUrl, emergency)
  }

 

  deleteEmergency(id: number) {
    const serviceUrl = `api/emergency/${id}`
    return this.delete(serviceUrl)
  }
}
