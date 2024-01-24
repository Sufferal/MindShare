import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { ProfileService } from '../../services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.scss']
})
export class ProfileEditFormComponent implements OnInit {
  @Input() user!: User;

  profileEditForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private profileService: ProfileService,
    private notificationBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileEditForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      dateOfBirth: this.user.dateOfBirth,
      gender: this.user.gender,
      username: this.user.username,
      email: this.user.email
    });
  }

  onSubmit(): void {
    if (this.profileEditForm.valid) {
      this.notificationBar.open("Profile updated succesfully", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
  
      const updatedProfile: User = {
        firstName: this.profileEditForm.get('firstName')?.value as string,
        lastName: this.profileEditForm.get('lastName')?.value as string,
        dateOfBirth: this.profileEditForm.get('dateOfBirth')?.value as string,
        gender: this.profileEditForm.get('gender')?.value as string,
        username: this.profileEditForm.get('username')?.value as string,
        email: this.profileEditForm.get('email')?.value as string,
      };
  
      const req = this.profileService.updateUser(updatedProfile);
      req.subscribe();

    } else {
      this.notificationBar.open("Post cannot be created", "Close", {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
}

