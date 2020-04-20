import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarDevolucionComponent } from './agregar-devolucion.component';


const routes: Routes = [
  {
    path:'', component:AgregarDevolucionComponent
  },  
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarDevolucionRoutingModule { }
