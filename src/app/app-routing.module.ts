import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppHistoriaComponent } from './app-historia/app-historia.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { SubscriberPageComponent } from './subscriber-page/subscriber-page.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { AppVidrariaComponent } from './app-vidraria/app-vidraria.component';

import { AdminGuard } from './core/admin.guard';
import { CanReadGuard } from './core/can-read.guard';
import { UserGuard } from './core/user.guard';


const routes: Routes = [
  { path: '', component: AppHistoriaComponent },
  { path: 'content', component: SubscriberPageComponent, canActivate: [CanReadGuard] },
  { path: 'secret', component: SuperSecretComponent, canActivate: [AdminGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'registrar', component: UserSignupComponent },
  { path: 'vidrarias', component: AppVidrariaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
