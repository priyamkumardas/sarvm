import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { promise } from 'protractor';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
  }

  async getCat(key: string){
    // console.log(key,await this.storage.get(key))
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const data = await this.storage.get(key);
    return data;
  }

  async setCat(key: string, value: any){
    // const encryptedValue = btoa(escape(JSON.stringify(value)));
    await this.storage.defineDriver(CordovaSQLiteDriver);
    this.storage.set(key, value);
    console.log(key, value)
  }

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
    if (res && atob(res)!='undefined') {
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
