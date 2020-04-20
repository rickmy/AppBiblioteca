import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamosRoutingModule } from './prestamos-routing.module';
import { PrestamosComponent } from './prestamos.component';
import { AgregarPrestamoComponent } from './agregar-prestamo/agregar-prestamo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrestamosComponent],
  imports: [
    CommonModule,
    PrestamosRoutingModule,
    FormsModule
  ]
})
export class PrestamosModule { }
