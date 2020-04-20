import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEditorialRoutingModule } from './agregar-editorial-routing.module';
import { AgregarEditorialComponent } from './agregar-editorial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarEditorialComponent],
  imports: [
    CommonModule,
    AgregarEditorialRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgregarEditorialModule { }
