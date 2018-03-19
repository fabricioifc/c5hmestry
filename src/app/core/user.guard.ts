import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';


@Injectable()
export class UserGuard implements CanActivate {

  message: string

  constructor(private auth: AuthService,
    private router: Router) {}

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

}
