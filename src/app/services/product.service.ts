import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Firebase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

// Model
import { Product } from '../models/product';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

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
      price: product.price
    });
  }

  updateProduct(product: Product)
  {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key: string)
  {
    this.productList.remove($key);
  }
}
