import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }

  navigateToUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
