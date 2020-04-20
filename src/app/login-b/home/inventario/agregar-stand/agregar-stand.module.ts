import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarStandRoutingModule } from './agregar-stand-routing.module';
import { AgregarStandComponent } from './agregar-stand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgregarStandComponent],
  imports: [
    CommonModule,
    AgregarStandRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgregarStandModule { }
