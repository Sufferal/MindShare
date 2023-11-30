import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourceRoutingModule } from './resource-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ResourceComponent
  ],
  imports: [
    CommonModule,
    ResourceRoutingModule,
    SharedModule
  ]
})
export class ResourceModule { }
