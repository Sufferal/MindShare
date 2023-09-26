import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() showLoginEvent = new EventEmitter<boolean>();
  navigateToRegister() {
    this.showLoginEvent.emit(true);
  }

  login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
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
