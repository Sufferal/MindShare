import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  showLoginComponent: boolean = true;

  toggleLogin() {
    this.showLoginComponent = !this.showLoginComponent;
  }
}
