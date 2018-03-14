import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { firebaseConfig } from '../environments/firebase.config';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { CoreModule } from './core/core.module';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';

import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    SuperSecretComponent,
    UserLoginComponent,
    SubscriberPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
