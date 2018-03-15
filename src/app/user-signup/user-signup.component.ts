import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.auth.emailSignup(
        formData.value.email,
        formData.value.password
      );
    }
  }
  

}
