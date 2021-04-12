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
    FB.login(this.loginCallback);
  }

  getData(){
    return new Promise<any>( resolve => {
      FB.api('/me', {fields: ['first_name','last_name', 'email','picture']},resolve);
    });
  }

  showProfile(){
    this.facebookUser = FU;
    this.showUser = true;
  }

  loginCallback(response){
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      this.getData().then( result =>{
        console.log('Result promise: ', result);
      });
     } else {
      console.log('User cancelled login or did not fully authorize.');
     }
  }

  retrieveData(response){
    console.log('response: ', response);
    console.log('Good to see you, ' + response.first_name +' '+ response.last_name + '.');
    console.log('Tu mail es: ',response.email, '?');
    console.log('User ID: ', response.id);
    var elementName = document.getElementById('usr-name');
    var elementEmail = document.getElementById('usr-name'); 
    elementName.innerText = response.first_name + response.last_name;
    elementEmail.innerText = response.email;
  }

  queryFacebookAPI(){
    FB.api('/me', {fields: ['first_name','last_name', 'email','picture']}, this.retrieveData);
  }

}
