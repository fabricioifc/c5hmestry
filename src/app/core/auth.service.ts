import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap, merge } from 'rxjs/operators';
import { User } from '../models/user';

import { NotifyService } from './notify.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  avatar: string;

  constructor(public afAuth: AngularFireAuth,
            private db: AngularFireDatabase,
            private router: Router,
            private notify: NotifyService) {
      //// Get auth data, then get firestore user document || null
      this.user$ = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            this.avatar = user.photoURL == null ? 'assets/avatar.svg' : user.photoURL
            return this.db.object<User>(`users/${user.uid}`).valueChanges()
          } else {
            return Observable.of(null)
          }
        })
  }

  isLoggedIn(user: User): boolean {
    return user !== null;
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then((user) => {
       this.updateUserData(user); // if using firestore
       this.router.navigateByUrl('/login');
     })
     .catch((error) => this.handleError(error) );
  }

  emailSignup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      // this.notify.update('Conta criada com sucesso!!!', 'success');
      this.login(email, password)
      // this.router.navigateByUrl('/login');
    }).catch((error) => this.handleError(error) );
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Seja bem vindo!!!', 'success');
        this.updateUserData(credential.user)
      }).catch((error) => this.handleError(error) );
  }

  signOut() {
    console.log("Saindo")
    this.notify.update('Saindo!!!', 'success');
    this.afAuth.auth.signOut()
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const itemPath = `users/${user.uid}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<User | null>;

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      roles: {
        subscriber: true
      }
    }

    item.subscribe(u => {
      if (u) {
        data.roles = u.roles
      }
      return this.db.object(itemPath).update(data)
    })
  }


  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  canAdmin(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true
      }
    }
    return false
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  getUserAvatar(): string {
    console.log(this.avatar)
    return this.avatar
  }
}
