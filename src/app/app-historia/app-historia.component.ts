import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-historia',
  templateUrl: './app-historia.component.html',
  styleUrls: ['./app-historia.component.scss']
})
export class AppHistoriaComponent implements OnInit {

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
  }

}
