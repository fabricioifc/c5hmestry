import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {
  
  public user;
  public islogged : boolean;

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService) {

      this.auth.user$.subscribe(user => {
        if (user) {
          console.log(user);
          
          this.islogged=true;
          this.user = user
        } else {
          this.islogged=false;
        }
      })
  }

  ngOnInit() {
  }


}
