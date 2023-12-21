import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  //Store the value
  async set(key: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await localStorage.setItem(key, encryptedValue);
  }

  //Get the value
  async get(key: string) {
    const res = await localStorage.getItem(key);
    if (res) {
      return JSON.parse(unescape(atob(res)));
    } else {
      return false;
    }
  }

  //Remove the value
  async remove(key: string) {
    await localStorage.removeItem(key);
  }

  //Clear Storage
  async clear() {
    await localStorage.clear;
  }

  //Store the value
  setItem(key: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    localStorage.setItem(key, encryptedValue);
  }

  //Get the value
  getItem(key: string) {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(unescape(atob(res)));
    } else {
      return false;
    }
  }

  getItemWithPromise(key:string){
    return new Promise((resolve, reject) => {
      resolve(this.getItem(key));
    });
  }
  
}
