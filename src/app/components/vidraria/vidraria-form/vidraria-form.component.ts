import { Component, OnInit } from '@angular/core';
import { Upload } from '../../../models/upload';
import { Vidraria } from '../../../models/vidraria';
import { VidrariaService } from '../../../services/vidraria.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { NgForm } from '@angular/forms';
import { NotifyService } from '../../../core/notify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'vidraria-form',
  templateUrl: './vidraria-form.component.html',
  styleUrls: ['./vidraria-form.component.scss']
})
export class VidrariaFormComponent implements OnInit {

  selectedFiles: FileList;
  upload: Upload;
  objeto: Vidraria = new Vidraria();

  constructor(
    private service: VidrariaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private upSvc: UploadService,
    private notify: NotifyService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.service.getItemsList()
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.getItem(id).subscribe(x => {
        let aux = Object.assign(new Vidraria(), x)
        aux.$key = id
        this.objeto = aux;
      });      
    } else {
      this.resetForm();
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.valid) {
      this.addSpinner()
      if (this.selectedFiles != null) {
        this.upload = new Upload(this.selectedFiles.item(0));
        this.upSvc.pushUpload(this.upload).then((x) => {
          productForm.value.fileurl = this.upload.url
          productForm.value.filename = this.upload.name
          this.salvar(productForm)
        })
      } else {
        this.salvar(productForm)
      }
      
    }
  }

  salvar(productForm: NgForm) {
    if(productForm.value.$key == null)
      this.service.createItem(productForm.value);
    else
      this.service.updateItem(productForm.value.$key, productForm.value);

    this.resetForm(productForm);
    this.toastr.success('Operação efetuada com sucesso', 'Produto salvo');
    this.router.navigate(['/vidrarias']);
    this.removeSpinner()
  }

  resetForm(productForm?: NgForm) {
    if(productForm != null)
      productForm.reset();
      this.objeto = new Vidraria();
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }


  // Default error handling for all actions
  handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

  handleSuccess(message: string) {
    console.error(message);
    this.notify.update(message, 'success')
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
