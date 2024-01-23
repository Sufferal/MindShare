import { AbstractControl, ValidationErrors } from '@angular/forms';

export function alphabeticalValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value && value.length > 0 && !value.match(/^[a-zA-Z]+$/)) {
      return { alphabetical: true };
    }

    return null;
  }

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const minDate = new Date('1/1/1950');
    const maxDate = new Date('12/31/2009');

    if (date < minDate || date > maxDate) {
      return { dateRange: true };
    }

    return null;
  }

export function alphaNumericValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const valid = /^[a-zA-Z0-9_]*$/.test(control.value);
    return valid ? null : { alphanumeric: true };
  }

export function emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }

    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      control.value
    );
    return valid ? null : { invalidEmail: true };
  }

export function passwordMatcher(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }

export function strongPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    if (!/(?=.*[a-z])/.test(value)) {
      return { 'lowercase': 'Password must contain at least one lowercase letter' };
    }

    if (!/(?=.*[A-Z])/.test(value)) {
      return { 'uppercase': 'Password must contain at least one uppercase letter' };
    }

    if (!/(?=.*[0-9])/.test(value)) {
      return { 'number': 'Password must contain at least one number' };
    }

    if (!/(?=.*[!@#\$%\^&\*])/.test(value)) {
      return { 'special': 'Password must contain at least one special character' };
    }

    if (!(value.length >= 10)) {
      return { 'length': 'Password must be at least 10 characters long' };
    }

    return null;
  }