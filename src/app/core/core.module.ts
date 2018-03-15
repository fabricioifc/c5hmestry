import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { CanReadGuard } from './can-read.guard';
import { NotifyService } from './notify.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AdminGuard, CanReadGuard, UserGuard, NotifyService]
})
export class CoreModule { }
