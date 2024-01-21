import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user!: User;
  showProfileEditForm: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {    
    this.profileService.getUser().subscribe((data: User) => {
      this.user = data
    });
  }

  toggleProfileEditForm() {
    this.showProfileEditForm = !this.showProfileEditForm;
  }
}
