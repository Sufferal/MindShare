import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, FooterComponent } from './components';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})

export class SharedModule { }
