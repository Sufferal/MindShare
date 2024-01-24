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

@NgModule({
  declarations: [AuthPageComponent, RegisterComponent, LoginComponent, AccActivationPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
})
export class AuthModule {}
