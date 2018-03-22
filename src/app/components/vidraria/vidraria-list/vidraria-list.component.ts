import { Component, OnInit } from '@angular/core';
// model
import { Vidraria } from '../../../models/vidraria';
// service
import { ProductService } from '../../../services/product.service';
// toastr
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../core/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VidrariaService } from '../../../services/vidraria.service';
import { NotifyService } from '../../../core/notify.service';

@Component({
  selector: 'vidraria-list',
  templateUrl: './vidraria-list.component.html',
  styleUrls: ['./vidraria-list.component.scss']
})
export class VidrariaListComponent implements OnInit {

  lista: Observable<Vidraria[]>;
  // objeto: Vidraria = {} as Vidraria;
  isLoggedIn:boolean;
  user;

  constructor(
    private service: VidrariaService,
    private toastr: ToastrService,
    private router: Router,
    protected spinner: NgxSpinnerService,
    protected notify: NotifyService,
    public auth: AuthService 
  ) {
    
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }

      this.lista = this.service.getItemsList()
    })
  }

  // onEdit(objeto: Vidraria) {
  //   this.objeto = Object.assign({}, objeto);
  // }

  onDelete(objeto: Vidraria) {
    if(confirm('Are you sure you want to delete it?')) {
      this.service.deleteItem(objeto).then(() => {
        this.toastr.warning('Deletado com sucesso', 'Produto removido');
        // this.handleSuccess("Item removido com sucesso!")
      }).catch((error) => {
        // this.handleError(error)
      })
    }
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
