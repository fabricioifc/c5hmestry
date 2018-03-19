import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable()
export class AdminGuard implements CanActivate {

  message: string

  constructor(private auth: AuthService,
    private notify: NotifyService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.message = "Acesso negado - Apenas para administradores"
          // console.error(this.message)
          // this._flashMessagesService.show(this.message, { cssClass: 'alert-danger', timeout: 5000, showCloseBtn: true })
          this.notify.update(this.message, 'error');
        }
      })
    );

  }
}
