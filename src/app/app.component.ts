import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
    private _flashMessagesService: FlashMessagesService) {
  }

  ngOnInit() {
    // this._flashMessagesService.show('We are in app component!', { cssClass: 'alert-success', timeout: 1000 });
  }

}
