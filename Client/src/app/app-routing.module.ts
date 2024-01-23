import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'login'
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules').then(m => m.PostsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules').then(m => m.ProfileModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'resources',
    loadChildren: () =>
      import('./modules/resource/resource.module').then((m) => m.ResourceModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
