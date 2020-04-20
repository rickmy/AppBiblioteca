import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarPrestamoRoutingModule } from './agregar-prestamo-routing.module';
import { AgregarPrestamoComponent } from './agregar-prestamo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ AgregarPrestamoComponent],
  imports: [
    CommonModule,
    AgregarPrestamoRoutingModule,
    FormsModule
  ]
})
export class AgregarPrestamoModule { }
