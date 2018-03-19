import { Injectable, OnInit } from '@angular/core';
import { Vidraria } from './vidraria';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Upload } from '../../core/model/upload';
import { NotifyService } from '../../core/notify.service';

@Injectable()
export class VidrariaService {

  private basePath = '/vidrarias/';

  itemsRef: AngularFireList<Vidraria>;
  itemRef:  AngularFireObject<Vidraria>;

  constructor(private db: AngularFireDatabase,
    private spinner: NgxSpinnerService,
    private notify: NotifyService) {

    this.itemsRef = db.list(this.basePath);
  }

  // Return an observable list of Items
  getItemsList(): Observable<Vidraria[]> {
    this.addSpinner()
    
    return this.itemsRef.snapshotChanges().map((arr) => {
      let result = arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
      this.removeSpinner()
      return result
    });
  }

  // Return a single observable item
  getItem(key: string): Observable<Vidraria | null> {
    this.addSpinner()

    const itemPath = `${this.basePath}/${key}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<Vidraria | null>;
    this.removeSpinner()
    return item;
  }

  // Create a brand new item
  createItem(item: Vidraria): void {
    this.addSpinner()

    this.itemsRef.push(item).then(() => {
      this.handleSuccess("Item adicionado com sucesso!")
    })
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.addSpinner()
    
    this.itemsRef.update(key, value).then(() => {
      this.handleSuccess("Item atualizado com sucesso!")
    }).catch((error) => {
      this.handleError(error)
    });
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.addSpinner()
    this.itemsRef.remove(key).then(() => {
      this.handleSuccess("Item removido com sucesso!")
    }).catch((error) => {
      this.handleError(error)
    })
  }

  // Deletes the entire list of items
  // deleteAll(): void {
  //   this.itemsRef.remove();
  // }

  // Default error handling for all actions
  handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
    this.removeSpinner()
  }

  handleSuccess(message: string) {
    console.error(message);
    this.notify.update(message, 'success')
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
