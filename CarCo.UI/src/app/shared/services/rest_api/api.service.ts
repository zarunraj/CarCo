import { Observable, of, tap, share, finalize } from "rxjs";
import { environment } from "src/environments/environment";

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from "../authentication.service";


export class ApiService {
  private cache: { [key: string]: any } = {};
  private cachedObservable?: { [key: string]: Observable<any> } = {};

  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }





  protected get(url: string, qParams?: Array<any>): Observable<any> {
    const serviceUrl = `${environment.apiUrl}${url}`;
    let params = new HttpParams().set('_key', Math.random().toString());
    if (qParams) {
      qParams.forEach(p => {
        params = params.append(p.key, p.value);
      });
    }
    const options: any = {
      params: params
    };
    if (this.authService.CurrentUser) {
      options.headers = this.getHeader();
    }

    return this.http.get(serviceUrl, options);
  }


  protected post(url: string, data: any, _options?:any): Observable<any> {
    const serviceUrl = `${environment.apiUrl}${url}`;
    const params = new HttpParams().set('_key', Math.random().toString());
    const options: any = {     
      ..._options,
      params: params
    };
    if (this.authService.CurrentUser) {
      options.headers = this.getHeader();
    }
    return this.http.post(serviceUrl, data, options);
  }
  protected put(url: string, data: any): Observable<any> {
    const serviceUrl = `${environment.apiUrl}${url}`;
    const params = new HttpParams().set('_key', Math.random().toString());
    const options: any = {
      params: params
    };
    if (this.authService.CurrentUser) {
      options.headers = this.getHeader();
    }
    return this.http.put(serviceUrl, data, options);
  }

  protected patch(url: string, data: any): Observable<any> {
    const serviceUrl = `${environment.apiUrl}${url}`;
    const params = new HttpParams().set('_key', Math.random().toString());
    const options: any = {
      params: params
    };
    if (this.authService.CurrentUser) {
      options.headers = this.getHeader();
    }
    return this.http.patch(serviceUrl, data, options);
  }



  protected delete(url: string): Observable<any> {
    const serviceUrl = `${environment.apiUrl}${url}`;
    const params = new HttpParams().set('_key', Math.random().toString());
    const options: any = {
      params: params
    };
    if (this.authService.CurrentUser) {
      options.headers = this.getHeader();
    }
    return this.http.delete(serviceUrl, options);
  }


  private getHeader() {
    // let _authorization =`Bearer ${this.authService.CurrentUser?.token || ''}`;
    let _authorization =this.authService.CurrentUser?.token||'';
    const options = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
      'Token': _authorization,
      'SignalRConnectionId': ''
    };
    
    const _headers = new HttpHeaders(options);
    return _headers;
  }

  deleteCache(url:string){

    let serviceUrl = `${environment.apiUrl}${url}`;
    delete this.cache[serviceUrl];
    if(this.cachedObservable)
    {
      delete this.cachedObservable[serviceUrl];
    } 
  }
}
