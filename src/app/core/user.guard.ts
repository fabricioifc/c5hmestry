import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';


@Injectable()
export class UserGuard implements CanActivate {

  message: string

  constructor(private auth: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) {}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>  {

      return this.auth.user$.pipe(
         take(1),
         map(user => !!user),
         tap(loggedIn => {
           
           if (!loggedIn) {
             console.log('access denied')
             this.router.navigate(['/login']);
           }
       })
     );

   }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> {
  //
  //   return this.auth.user$.pipe(
  //     take(1),
  //     map(user => user ? true : false),
  //     tap(signedIn => {
  //       if (signedIn) {
  //         this.message = "Usuário já está logado."
  //         this._flashMessagesService.show(this.message, { cssClass: 'alert-warning', timeout: 3000, showCloseBtn: true })
  //       } else {
  //         this.router.navigate(['/login'], {});
  //       }
  //       return signedIn
  //     })
  //   );
  //
  // }

}
