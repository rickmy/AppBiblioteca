import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarBibliotecarioRoutingModule } from './agregar-bibliotecario-routing.module';
import { AgregarBibliotecarioComponent } from './agregar-bibliotecario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarBibliotecarioComponent],
  imports: [
    CommonModule,
    AgregarBibliotecarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgregarBibliotecarioModule { }
