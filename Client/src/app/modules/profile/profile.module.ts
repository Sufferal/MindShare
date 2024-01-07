import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
