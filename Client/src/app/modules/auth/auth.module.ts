import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RegisterComponent, LoginComponent } from './components';

import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AccActivationPageComponent } from './pages/acc-activation-page/acc-activation-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';

@NgModule({
  declarations: [AuthPageComponent, RegisterComponent, LoginComponent, AccActivationPageComponent, TwoFactorAuthComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule
  ],
})
export class AuthModule {}
