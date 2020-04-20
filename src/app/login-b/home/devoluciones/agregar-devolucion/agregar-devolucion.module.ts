import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDevolucionRoutingModule } from './agregar-devolucion-routing.module';
import { AgregarDevolucionComponent } from './agregar-devolucion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarDevolucionComponent],
  imports: [
    CommonModule,
    AgregarDevolucionRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class AgregarDevolucionModule { }
