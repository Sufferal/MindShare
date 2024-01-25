import { Component, Input } from '@angular/core';
import { User } from '../../models';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  @Input() user!: any;  
  is2faEnabled: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.is2faEnabled = this.user.isTwoFactorAuth;
  }

  onToggle2fa(): void {
    this.profileService.toggle2FA({
      username: this.user.username,
      isActivated: this.is2faEnabled
    }).subscribe((res: any) => {
      console.log(res);
    });
  }
}
