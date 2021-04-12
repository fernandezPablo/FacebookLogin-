import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

declare const FB: any;

export function appInitializer() {
  return () => new Promise<void>(resolve => {
      // wait for facebook sdk to initialize before starting the angular app
      window['fbAsyncInit'] = function () {
          FB.init({
              appId: environment.facebookAppId,
              cookie: true,
              xfbml: true,
              version: 'v10.0'
          });

          // auto authenticate with the api if already logged in with facebook
          FB.getLoginStatus(({authResponse}) => {
              if (authResponse) {
                console.log(authResponse);
              } else {
                  resolve();
              }
          });
      };

      // load facebook sdk script
      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));    
  });
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
