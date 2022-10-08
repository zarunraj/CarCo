import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../../models/driver';
import { Offer } from '../../models/offer';
import { AuthenticationService } from '../authentication.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OffersService  extends ApiService {
  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService,
  ) {
    super(_http, _authService)
  }

  getOffers() {
    const serviceUrl = `api/offers`
    return this.get(serviceUrl)
  }

  getOffer(id: number) {
    const serviceUrl = `api/offers/${id}`
    return this.get(serviceUrl)
  }

  edit(id: number, offer: Offer) {
    const serviceUrl = `api/offers/${id}`
    return this.put(serviceUrl, offer)
  }
  save(offer: Offer) {
    const serviceUrl = `api/Offers`
    return this.post(serviceUrl, offer)
  }

  uploadImage(id: number, image: any) {
    const formData = new FormData()
    formData.append('file', image) 
    formData.append('DocumnetType', 'offer')

    return this.post(`api/offers/${id}/uploadImage`, formData)
  }

  

  deleteOffer(id: number) {
    const serviceUrl = `api/offers/${id}`
    return this.delete(serviceUrl)
  }
}
