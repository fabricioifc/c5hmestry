import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import { Vidraria } from '../core/model/vidraria';

@Component({
  selector: 'app-glossario',
  templateUrl: './app-glossario.component.html',
  styleUrls: ['./app-glossario.component.scss']
})
export class AppGlossarioComponent implements OnInit {
  
  // lista: Observable<Vidraria[]>;

  constructor(private afs: AngularFirestore) {
    // this.lista = afs.collection<Vidraria>('vidrarias').valueChanges()
  }

  ngOnInit() {
  }

}
