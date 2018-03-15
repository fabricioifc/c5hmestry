import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHistoriaComponent } from './app-historia/app-historia.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { NotificationMessageComponent } from './ui/notification-message/notification-message.component';
import { AppVidrariaComponent } from './app-vidraria/app-vidraria.component';


@NgModule({
  declarations: [
    AppComponent,
    SuperSecretComponent,
    UserLoginComponent,
    SubscriberPageComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppHistoriaComponent,
    UserSignupComponent,
    NotificationMessageComponent,
    AppVidrariaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
