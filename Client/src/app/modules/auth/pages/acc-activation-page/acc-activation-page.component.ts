import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acc-activation-page',
  templateUrl: './acc-activation-page.component.html',
  styleUrls: ['./acc-activation-page.component.scss']
})
export class AccActivationPageComponent {
  constructor(private router: Router) {}

  redirectToPostsPage() {
    this.router.navigate(['/posts']);
  }
}
