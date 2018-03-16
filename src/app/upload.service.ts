import { Injectable } from '@angular/core';
import { Upload } from './core/model/upload';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        console.log(uploadTask.snapshot.bytesTransferred)
        // upload in progress
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );
  }



  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`uploads`).push(upload);
  }

}
