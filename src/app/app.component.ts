import { Component } from '@angular/core';
import { FacebookUserService } from './facebook-user.service';

declare var FB: any;
declare var FU: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  facebookUser: any;
  showUser = false;

  constructor(private facebookUserService: FacebookUserService){}

  login(){
    console.log('Login ...');
    this.facebookLogin().then( result =>{
      console.log('Result Login: ', result);
      this.getData().then( result2 => {
        console.log('User data: ',result2);
        this.facebookUser = result2;
      })
    })
  }


  facebookLogin(){
    return new Promise(resolve => {
      FB.login(function (response){
        resolve(response);
      });
    });
  }

  getData(){
    return new Promise<any>( resolve => {
      FB.api('/me', {fields: ['first_name','last_name', 'email','picture']},resolve);
    });
  }

}


