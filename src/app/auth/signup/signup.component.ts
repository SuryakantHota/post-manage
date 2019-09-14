import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.servicce';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class AppSignupComponent {
  constructor( private authService: AuthService) {}
  isLoading = false;

  onSignup ( form: NgForm) {
    console.log("onSignup form", form.value);
    if ( form.invalid ) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
