import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppHistoriaComponent } from './components/app-historia/app-historia.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignupComponent } from './components/user-signup/user-signup.component';
import { VidrariaListComponent } from './components/vidraria/vidraria-list/vidraria-list.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/products/form/product-form.component';

import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { UserGuard } from './core/user.guard';
import { ProductListComponent } from './components/products/list/product-list.component';
import { VidrariaFormComponent } from './components/vidraria/vidraria-form/vidraria-form.component';


const routes: Routes = [
  { path: '', component: AppHistoriaComponent },
  // { path: 'content', component: SubscriberPageComponent, canActivate: [CanReadGuard] },
  // { path: 'secret', component: SuperSecretComponent, canActivate: [AdminGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'registrar', component: UserSignupComponent },
  { path: 'vidrarias', component: VidrariaListComponent },
  { path: 'vidrarias/new', component: VidrariaFormComponent, canActivate: [AdminGuard] },
  { path: 'vidrarias/:id/edit', component: VidrariaFormComponent, canActivate: [AdminGuard] },
  { path: 'upload', component: UploadFormComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent, canActivate: [AdminGuard] },
  { path: 'products/:id/edit', component: ProductFormComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
