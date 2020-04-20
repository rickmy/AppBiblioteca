import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarTextoRoutingModule } from './agregar-texto-routing.module';
import { AgregarTextoComponent } from './agregar-texto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarTextoComponent],
  imports: [
    CommonModule,
    AgregarTextoRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AgregarTextoModule { }
