import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  personalDetails!: FormGroup;
  socialDetails!: FormGroup;
  personalStep: boolean = true;
  socialStep: boolean = false;
  step: number = 1; 

  constructor(private userService: AuthApiService, 
              private fb: FormBuilder, 
              private router: Router) { }
  
  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      firstName: ['Dwayne', Validators.required],
      lastName: ['Johnson', Validators.required],
      dateOfBirth: ['2000-01-01', Validators.required],
      gender: ['male', Validators.required],
    });

    this.socialDetails = this.fb.group({
      username: ['rock', Validators.required],
      email: ['rock@gmail.com', Validators.required],
      password: ['qwerty', Validators.required],
      confirmPassword: ['qwerty', Validators.required],
    });
  }

  get personal() { return this.personalDetails.controls; }

  next(isFormValid: boolean) {
    if(!isFormValid) {
      this.personalDetails.markAllAsTouched();
      return;
    }
    this.step++;
  }

  prev() {
    this.step--;
  } 

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    if (this.personalDetails.valid && this.socialDetails.valid) {
      const socialDetails = {
        username: this.socialDetails.value.username,
        email: this.socialDetails.value.email,
        password: this.socialDetails.value.password,
      };

      const user: User = {
        ...this.personalDetails.value,
        ...socialDetails,
      };

      this.userService.createUser(user).subscribe(() => {  
        this.navigateToLogin();
      });
    } else {
      this.socialDetails.markAllAsTouched();
    }
  }
}
