import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-equipamento',
  templateUrl: './app-equipamento.component.html',
  styleUrls: ['./app-equipamento.component.scss']
})
export class AppEquipamentoComponent implements OnInit {

  lista: Observable<any[]>;

  constructor(private afs: AngularFirestore,
    private spinner: NgxSpinnerService) {
  }


  ngOnInit() {
    this.spinner.show();

    this.lista = this.afs.collection<any[]>('equipamentos').valueChanges()

    this.lista.subscribe((v) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
      }
    )
  }

}