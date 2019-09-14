import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.servicce';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AppLoginComponent {
  constructor( private authService: AuthService){}
  isLoading = false;

  onLogin ( form: NgForm) {
    console.log("onLogin form", form.value);
    if ( form.invalid ) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
