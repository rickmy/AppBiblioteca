import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTipoTextoComponent } from './agregar-tipo-texto.component';


const routes: Routes = [
  {
    path:'', component:AgregarTipoTextoComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarTipoTextoRoutingModule { }
