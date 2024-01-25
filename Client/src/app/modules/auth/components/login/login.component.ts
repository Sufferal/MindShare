import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  attemptLogin: boolean = false;
  failedAttempts: number = 0;
  isLoginLocked: boolean = false;
  isAccountActivated: any = null;

  public readonly emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  constructor(private userService: AuthApiService, 
              private fb: FormBuilder,
              private router: Router) {}
           
  ngOnInit(): void {
    const storedIsLoginLocked = localStorage.getItem('isLoginLocked');
    this.isLoginLocked = storedIsLoginLocked ? JSON.parse(storedIsLoginLocked) : false;

    if (this.isLoginLocked) {
      setTimeout(() => {
        this.isLoginLocked = false;
        localStorage.removeItem('isLoginLocked');
      }, 30000);
    }

    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToResources() {
    setTimeout(() => {
      this.router.navigateByUrl('/posts');
    }, 1000);
  }
  
  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }

  onSubmit() {
    if(this.isLoginLocked) {
      console.log('Login is locked. Too many failed attempts.');
      return;
    }

    if (this.login.valid) {
      const loginData = { ...this.login.value };
      this.userService.getUser(loginData).subscribe((res: any) => {
        if(res.status === 200) {
          console.log(res);
          // Directly post res.data to the createUser endpoint
          this.userService.postUser(res.data).subscribe(
            (createUserResponse: any) => {
              console.log(createUserResponse);
              this.navigateToResources();
            },
            (createUserError) => {
              console.error(createUserError);
            }
          );
        } else if (res.status === 401) {
          if(res.message === 'Login failed: Account not activated.') {
            this.isAccountActivated = 'not activated';
          } else if(res.message === 'Login failed: Two-step authentication required.') {
           const user = {
              username: loginData.username,
              password: loginData.password,
           };

           console.log(user);

           this.userService.postUser(user).subscribe(
              (createUserResponse: any) => {
                console.log(createUserResponse);
                // this.navigateToResources();
              },
              (createUserError) => {
                console.error(createUserError);
              }
            );

            this.router.navigateByUrl('/login-2fa');
          }
          
          this.failedAttempts++;
          this.attemptLogin = true;
          console.log(res);

          if(this.failedAttempts >= 3) {
            this.isLoginLocked = true;
            localStorage.setItem('isLoginLocked', JSON.stringify(this.isLoginLocked));

            setTimeout(() => {
              this.isLoginLocked = false;
              this.failedAttempts = 0;
              localStorage.removeItem('isLoginLocked');
            }, 30000);
          }
        }
      });
    } else {
      this.login.markAllAsTouched();
    }
  }
}
