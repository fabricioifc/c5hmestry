// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { CoreModule } from './core/core.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Componentes
import { AppComponent } from './app.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/products/form/product-form.component';
import { ProductListComponent } from './components/products/list/product-list.component';
import { AppHistoriaComponent } from './components/app-historia/app-historia.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { VidrariaListComponent } from './components/vidraria/vidraria-list/vidraria-list.component';

// Diretivas
import { FileDropDirective } from './directives/file-drop.directive';

// UI, Util
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NotificationMessageComponent } from './ui/notification-message/notification-message.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { ToastrModule } from 'ngx-toastr';

// services
import { ProductService } from './services/product.service';
import { UploadService } from './services/upload.service';
import { VidrariaService } from './services/vidraria.service';
import { VidrariaFormComponent } from './components/vidraria/vidraria-form/vidraria-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    AppNavbarComponent,
    AppFooterComponent,
    AppHistoriaComponent,
    UserSignupComponent,
    NotificationMessageComponent,
    UploadFormComponent,
    FileDropDirective,
    SanitizeHtmlPipe,
    ProductsComponent,
    ProductFormComponent,
    ProductListComponent,
    VidrariaListComponent,
    VidrariaFormComponent
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
