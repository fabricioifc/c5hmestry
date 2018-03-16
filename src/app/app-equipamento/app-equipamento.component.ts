import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Vidraria } from '../core/model/vidraria';

@Component({
  selector: 'app-equipamento',
  templateUrl: './app-equipamento.component.html',
  styleUrls: ['./app-equipamento.component.scss']
})
export class AppEquipamentoComponent implements OnInit {

  lista: Observable<Vidraria[]>;

  constructor(private afs: AngularFirestore) {
    this.lista = afs.collection<Vidraria>('vidrarias').valueChanges()
  }

  ngOnInit() {
  }

}
