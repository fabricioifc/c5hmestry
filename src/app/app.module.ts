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

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

import { UploadFormComponent } from './upload-form/upload-form.component';
import { FileDropDirective } from './file-drop.directive';
import { AngularFireDatabase } from 'angularfire2/database';
import { AppEquipamentoComponent } from './app-equipamento/app-equipamento.component';
import { AppSubstanciaComponent } from './app-substancia/app-substancia.component';
import { AppGlossarioComponent } from './app-glossario/app-glossario.component';

import { VidrariaService } from './app-vidraria/shared/vidraria.service';
import { UploadService } from './upload.service';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/products/form/product-form.component';
import { ProductListComponent } from './components/products/list/product-list.component';

// service
import { ProductService } from './services/product.service';

// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
    UploadFormComponent,
    FileDropDirective,
    AppEquipamentoComponent,
    AppSubstanciaComponent,
    AppGlossarioComponent,
    SanitizeHtmlPipe,
    ProductsComponent,
    ProductFormComponent,
    ProductListComponent,
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
    Ng4LoadingSpinnerModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  exports: [
    SanitizeHtmlPipe
  ],
  providers: [AngularFireDatabase,
    UploadService, VidrariaService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
