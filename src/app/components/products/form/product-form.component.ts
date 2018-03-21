import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

//  Service
import { ProductService } from '../../../services/product.service';

// Class
import { Product } from '../../../models/product';

// toastr
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts();
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.productService.getProduct(id).subscribe(x => {
        let product = Object.assign(new Product(), x)
        product.$key = id
        this.productService.selectedProduct = product;
      });      
    } else {
      this.resetForm();
    }
  }

  onSubmit(productForm: NgForm) {
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value);
    else
      this.productService.updateProduct(productForm.value);

    this.resetForm(productForm);
    this.toastr.success('Sucessful Operation', 'Product Registered');
    this.router.navigate(['/products']);
  }

  resetForm(productForm?: NgForm)
  {
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Product();
  }

}
