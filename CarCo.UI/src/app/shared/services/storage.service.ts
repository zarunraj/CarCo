import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  get<Type>(name: string): Type | null {
    const rowdata = localStorage.getItem(name);
    let data = null;
    if (rowdata) {
      data = JSON.parse(rowdata) as Type;
    }
    return data;
  }

  remove(name: string) {
    localStorage.removeItem(name);
  }
}
