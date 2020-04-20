import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarTipoTextoRoutingModule } from './agregar-tipo-texto-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarTipoTextoComponent } from './agregar-tipo-texto.component';

@NgModule({
  declarations: [AgregarTipoTextoComponent],
  imports: [
    CommonModule,
    AgregarTipoTextoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgregarTipoTextoModule { }
