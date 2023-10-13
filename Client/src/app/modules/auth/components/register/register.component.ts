import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.socialDetails = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
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
    if (this.socialDetails.valid) {
      console.log(this.personalDetails.value);
      console.log(this.socialDetails.value);
    } else {
      this.socialDetails.markAllAsTouched();
    }
  }
}
