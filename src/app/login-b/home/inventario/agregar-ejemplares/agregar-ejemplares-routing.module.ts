import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarEjemplaresComponent } from './agregar-ejemplares.component';


const routes: Routes = [
  {
    path:'',component:AgregarEjemplaresComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarEjemplaresRoutingModule { }
