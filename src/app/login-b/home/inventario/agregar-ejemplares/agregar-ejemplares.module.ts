import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEjemplaresRoutingModule } from './agregar-ejemplares-routing.module';
import { AgregarEjemplaresComponent } from './agregar-ejemplares.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarEjemplaresComponent],
  imports: [
    CommonModule,
    AgregarEjemplaresRoutingModule,
    FormsModule
  ]
})
export class AgregarEjemplaresModule { }
