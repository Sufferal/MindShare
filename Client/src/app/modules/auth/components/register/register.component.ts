import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() showLoginEvent = new EventEmitter<boolean>();

  navigateToLogin() {
    this.showLoginEvent.emit(false);
  }
}
