import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { User } from '../../models/user.model';
import {
  alphabeticalValidator,
  alphaNumericValidator,
  dateRangeValidator,
  emailValidator,
  passwordMatcher,
  strongPasswordValidator,
} from '../../utils/register.validator';

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
  isOtherSelected: boolean = false;

  constructor(
    private userService: AuthApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalDetails = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          alphabeticalValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          alphabeticalValidator,
        ],
      ],
      dateOfBirth: ['', [Validators.required, dateRangeValidator]],
      gender: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          alphabeticalValidator,
        ],
      ],
    });

    this.socialDetails = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            alphaNumericValidator,
          ],
        ],
        email: ['', [Validators.required, emailValidator]],
        password: ['', [Validators.required, strongPasswordValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatcher }
    );

    this.personalDetails.controls['gender'].valueChanges.subscribe(
      (value: string) => {
        this.isOtherSelected = value !== 'male' && value !== 'female';
      }
    );
  }

  get personal() {
    return this.personalDetails.controls;
  }

  next(isFormValid: boolean) {
    if (!isFormValid) {
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

  setOtherGender(): void {
    this.isOtherSelected = true;
  }

  getFirstErrorMessage(errors: { [key: string]: any }): string {
    const errorKeys = Object.keys(errors).filter((key) => key !== 'required');
    return errors[errorKeys[0]];
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

      this.userService.createUser(user).subscribe((res: any) => {
        if (res.status === 200) {
          this.navigateToLogin();
        }

        console.log(res);
      });
    } else {
      this.socialDetails.markAllAsTouched();
    }
  }
}
