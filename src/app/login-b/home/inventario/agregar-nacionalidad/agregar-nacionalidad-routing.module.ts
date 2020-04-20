import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarNacionalidadComponent } from './agregar-nacionalidad.component';


const routes: Routes = [
  {
    path:'', component:AgregarNacionalidadComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarNacionalidadRoutingModule { }
