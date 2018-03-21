import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Model
import { Product } from '../models/product';
import { UploadService } from '../upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase,
    private upSvc: UploadService,
    private spinner: NgxSpinnerService
  ) { }

  getProducts() {
    return this.productList = this.firebase.list('products');
  }

  getProduct(key: string) {
    const itemPath = `products/${key}`;
    // const item = this.firebase.object(itemPath).valueChanges()
    const item = this.firebase.object(itemPath).valueChanges()
    return item
  }

  insertProduct(product: Product)
  {    
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
      fileurl: product.fileurl,
      filename: product.filename
    });
  }

  updateProduct(product: Product)
  {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price,
      fileurl: product.fileurl,
      filename: product.filename
    });
  }

  deleteProduct(product: Product) : Promise<any> {
    this.productList.remove(product.$key)
    return this.upSvc.deleteFileStorage(product.filename)
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
