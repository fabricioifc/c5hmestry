import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService,
              private _flashMessagesService: FlashMessagesService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content')
          this._flashMessagesService.show('Acesso negado. Deve ter permissão para ver este conteúdo', { cssClass: 'alert alert-danger', timeout: 5000, showCloseBtn: true });
        }
      })
    );

  }
}
