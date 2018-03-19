import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { NgxSpinnerService } from 'ngx-spinner';

import { UploadService } from '../upload.service';
import { Vidraria } from './shared/vidraria';
import { Upload } from '../core/model/upload';
import { VidrariaService } from './shared/vidraria.service'
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-vidraria',
  templateUrl: './app-vidraria.component.html',
  styleUrls: ['./app-vidraria.component.scss']
})
export class AppVidrariaComponent implements OnInit {
  @ViewChild('form') form;

  vidraria: Vidraria = {} as Vidraria;
  // colecao: AngularFirestoreCollection<Vidraria>;
  lista: Observable<Vidraria[]>;
  // vidraria: Vidraria;
  selectedFiles: FileList;
  upload: Upload;
  user;

  constructor(private afs: AngularFirestore,
    private spinner: NgxSpinnerService,
    private upSvc: UploadService,
    private service: VidrariaService,
    public auth: AuthService) {

      this.auth.user$.subscribe(user => this.user = user)
  }

  ngOnInit() {
    this.lista = this.service.getItemsList()
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  submit() {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.addSpinner()
      this.upload = new Upload(file.item(0));
      this.upSvc.pushUpload(this.upload).then((x) => {
        this.vidraria.imagem_file = this.upload.url
        this.vidraria.imagem_name = this.upload.name
        this.service.createItem(this.vidraria);
        this.reset()
      },(error) => {
        this.service.handleError(error)
      })
    } else {
      console.error('No file found!');
    }
  }

  deleteItem(item: Vidraria) {
    this.service.deleteItem(item.$key)
    this.upSvc.deleteFileStorage(item.imagem_name)
  }

  private reset(): void {
    // this.vidraria = new Vidraria(); // reset item
    this.form.nativeElement.reset()
    this.removeSpinner()
  }

  addSpinner() {
    this.spinner.show()
  }

  removeSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 300);
  }


}
