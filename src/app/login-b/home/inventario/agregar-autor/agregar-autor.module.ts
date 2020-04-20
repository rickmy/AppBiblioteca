import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarAutorRoutingModule } from './agregar-autor-routing.module';
import { AgregarAutorComponent } from './agregar-autor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarAutorComponent],
  imports: [
    CommonModule,
    AgregarAutorRoutingModule,
    FormsModule

  ]
})
export class AgregarAutorModule { }
