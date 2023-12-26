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

  public readonly emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  constructor(private userService: AuthApiService, 
              private fb: FormBuilder,
              private router: Router) {}
           
  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
  
  onSubmit() {
    if (this.login.valid) {
      const loginData = { ...this.login.value };
      this.userService.getUser(loginData).subscribe((res: any) => {
        if(res.status === 200) {
          this.navigateToRegister();
        } else if (res.status === 401) {
          this.attemptLogin = true;
          console.log(res);
        }
      });
    } else {
      this.login.markAllAsTouched();
    }
  }
}
