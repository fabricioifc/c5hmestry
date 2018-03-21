import { Component, OnInit } from '@angular/core';

// model
import { Product } from '../../../models/product';

// service
import { ProductService } from '../../../services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[];
  user;
  selectedProduct: Product = new Product();

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    public auth: AuthService
  ) { this.auth.user$.subscribe(user => this.user = user) }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.selectedProduct = Object.assign({}, product);
  }

  onDelete(product: Product) {
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.addSpinner()
      this.productService.deleteProduct(product).then(x => {
        this.toastr.warning('Deletado com sucesso', 'Produto removido');
        this.productService.removeSpinner()
      });
    }
  }

}
