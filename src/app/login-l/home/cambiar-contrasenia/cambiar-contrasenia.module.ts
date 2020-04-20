import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambiarContraseniaRoutingModule } from './cambiar-contrasenia-routing.module';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    CambiarContraseniaComponent
  ],
  imports: [
    CommonModule,
    CambiarContraseniaRoutingModule,
    FormsModule
  ]
})
export class CambiarContraseniaModule { }
