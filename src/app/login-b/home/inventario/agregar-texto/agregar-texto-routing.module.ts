import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTextoComponent } from './agregar-texto.component';


const routes: Routes = [
  {
    path:'', component:AgregarTextoComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarTextoRoutingModule { }
