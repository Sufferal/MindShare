import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}
  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  public readonly emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  login = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailRegex),
    ]),
    password: new FormControl('', Validators.required),
  });
  
  onSubmit() {
    if (this.login.valid) {
      console.log(this.login.value);
    } else {
      // Mark all fields as touched to display errors
      this.login.markAllAsTouched();
    }
  }
}
