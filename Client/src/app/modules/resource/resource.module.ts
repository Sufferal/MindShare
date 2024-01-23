import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourceRoutingModule } from './resource-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ]
})
export class ResourceModule { }
