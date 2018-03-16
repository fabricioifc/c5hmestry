import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Vidraria } from '../core/model/vidraria';

@Component({
  selector: 'app-substancia',
  templateUrl: './app-substancia.component.html',
  styleUrls: ['./app-substancia.component.scss']
})
export class AppSubstanciaComponent implements OnInit {

  lista: Observable<Vidraria[]>;

  constructor(private afs: AngularFirestore) {
    this.lista = afs.collection<Vidraria>('vidrarias').valueChanges()
  }

  ngOnInit() {
  }

}
