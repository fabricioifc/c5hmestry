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
    return this.itemsRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => Object.assign(snap.payload.val(), { $key: snap.key }) );
    });
  }

  // Return a single observable item
  getItem(key: string): Observable<Vidraria | null> {
    const itemPath = `${this.basePath}/${key}`;
    const item = this.db.object(itemPath).valueChanges() as Observable<Vidraria | null>;
    return item;
  }

  // Create a brand new item
  createItem(item: Vidraria): void {
    this.itemsRef.push(item)
  }

  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.itemsRef.update(key, value);
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.itemsRef.remove(key);
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.itemsRef.remove();
  }

  // Default error handling for all actions
  handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}
