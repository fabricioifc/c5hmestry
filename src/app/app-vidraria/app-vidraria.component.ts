import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Vidraria } from '../core/model/vidraria';

@Component({
  selector: 'app-vidraria',
  templateUrl: './app-vidraria.component.html',
  styleUrls: ['./app-vidraria.component.scss']
})
export class AppVidrariaComponent implements OnInit {

  vidrarias: Observable<Vidraria[]>;

  constructor(private afs: AngularFirestore) {
    this.vidrarias = afs.collection<Vidraria>('vidrarias').valueChanges()
  }

  ngOnInit() {
  }

}
