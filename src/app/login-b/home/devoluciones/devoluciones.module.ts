import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionesRoutingModule } from './devoluciones-routing.module';
import { AgregarDevolucionComponent } from './agregar-devolucion/agregar-devolucion.component';
import { DevolucionesComponent } from './devoluciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ DevolucionesComponent],
  imports: [
    CommonModule,
    DevolucionesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DevolucionesModule { }
