import { Injectable, OnInit } from '@angular/core';
import { Vidraria } from '../models/vidraria';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../models/upload';
import { NotifyService } from '../core/notify.service';
import { UploadService } from './upload.service';

@Injectable()
export class VidrariaService {

  private basePath = '/vidrarias/';

  itemsRef: AngularFireList<Vidraria>;
  itemRef:  AngularFireObject<Vidraria>;

  constructor(private db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private notify: NotifyService,
    private upSvc: UploadService) {

    this.itemsRef = db.list(this.basePath);
  }

  // Return an observable list of Items
  getItemsList(): Observable<Vidraria[]> {
    return this.itemsRef.snapshotChanges().map((arr) => {
      let result = arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
      return result
    });
  }

  // Return a single observable item
  getItem(key: string): Observable<Vidraria | null> {
    const itemPath = `${this.basePath}/${key}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<Vidraria | null>;
    return item;
  }

  // Create a brand new item
  createItem(value: Vidraria) {
    const $key = value.$key
    delete value.$key
    return this.itemsRef.push(value).then(() => {
      // this.handleSuccess("Item adicionado com sucesso!")
    })
  }

  // Update an exisiting item
  updateItem(value: Vidraria): void {
    const $key = value.$key
    delete value.$key
    
    this.itemsRef.update($key, value)
  }

  // Deletes a single item
  deleteItem(objeto: Vidraria): Promise<any> {
    if (objeto.filename != null) {
      this.upSvc.deleteFileStorage(objeto.filename)
    }
    return this.itemsRef.remove(objeto.$key)
  }

  // Deletes the entire list of items
  // deleteAll(): void {
  //   this.itemsRef.remove();
  // }

}
