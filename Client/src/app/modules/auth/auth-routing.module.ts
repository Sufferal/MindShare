import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from './components';
import { AccActivationPageComponent } from './pages';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';

const routes: Routes = [
  {
    path: 'acc-activation',
    component: AccActivationPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'login-2fa',
    component: TwoFactorAuthComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
