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
          this.navigateToResources();
        } else if (res.status === 401) {
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
