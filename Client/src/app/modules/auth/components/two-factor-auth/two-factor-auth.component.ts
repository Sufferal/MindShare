import { Component } from '@angular/core';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent {
  token: string = '';
  invalidToken: boolean = false;

  constructor(private authService: AuthApiService, 
              private router: Router) {}

  submitToken() {
    this.authService.submitToken(this.token).subscribe((res: any) => {
      console.log(res)
      if(res.status === 200) {
        this.invalidToken = false;
        this.authService.postUser(res.data).subscribe(
          (createUserResponse: any) => {
            console.log(createUserResponse);
          },
          (createUserError) => {
            console.error(createUserError);
          }
        );
 
        setTimeout(() => {
          this.router.navigateByUrl('/posts');
        }, 1000);
      } else if (res.status === 401 && res.message === 'Invalid two-step authentication token.') {
        this.invalidToken = true;
      }
    });
  }
}
