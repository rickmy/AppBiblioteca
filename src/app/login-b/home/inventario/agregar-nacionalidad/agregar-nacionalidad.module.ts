import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarNacionalidadRoutingModule } from './agregar-nacionalidad-routing.module';
import { AgregarNacionalidadComponent } from './agregar-nacionalidad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarNacionalidadComponent],
  imports: [
    CommonModule,
    AgregarNacionalidadRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgregarNacionalidadModule { }
