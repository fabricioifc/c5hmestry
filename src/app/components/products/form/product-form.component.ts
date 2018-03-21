import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

//  Service
import { ProductService } from '../../../services/product.service';
// Class
import { Product } from '../../../models/product';
// toastr
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Upload } from '../../../core/model/upload';
import { UploadService } from '../../../upload.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  selectedFiles: FileList;
  upload: Upload;
  selectedProduct: Product = new Product();

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private upSvc: UploadService
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.productService.getProduct(id).subscribe(x => {
        let product = Object.assign(new Product(), x)
        product.$key = id
        this.selectedProduct = product;
      });      
    } else {
      this.resetForm();
    }
  }

  onSubmit(productForm: NgForm) {
    this.productService.addSpinner()
    this.upload = new Upload(this.selectedFiles.item(0));
    this.upSvc.pushUpload(this.upload).then((x) => {
      productForm.value.fileurl = this.upload.url
      productForm.value.filename = this.upload.name

      if(productForm.value.$key == null)
        this.productService.insertProduct(productForm.value);
      else
        this.productService.updateProduct(productForm.value);

      this.resetForm(productForm);
      this.toastr.success('Operação efetuada com sucesso', 'Produto salvo');
      this.router.navigate(['/products']);
      this.productService.removeSpinner()
    })
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.selectedProduct = new Product();
  }

  detectFiles($event: Event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

}
