import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NgxSpinnerService} from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-historia',
  templateUrl: './app-historia.component.html',
  styleUrls: ['./app-historia.component.scss']
})
export class AppHistoriaComponent implements OnInit {

  lista: Observable<any[]>;

  constructor(private afs: AngularFirestore,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();

    this.lista = this.afs.collection<any[]>('historia').valueChanges()

    this.lista.subscribe((v) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 300);
      }
    )
  }

}
