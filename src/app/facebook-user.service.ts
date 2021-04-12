import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookUserService {

  facebookUser: any;

  constructor() { }

  setUser(fbUser: any){
    this.facebookUser;
  }
}
