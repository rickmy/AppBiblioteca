import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialesRoutingModule } from './historiales-routing.module';
import { HistorialesComponent } from './historiales.component';


@NgModule({
  declarations: [
    HistorialesComponent
  ],
  imports: [
    CommonModule,
    HistorialesRoutingModule
  ]
})
export class HistorialesModule { }
