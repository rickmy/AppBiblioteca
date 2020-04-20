import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarBibliotecarioComponent } from './agregar-bibliotecario.component';


const routes: Routes = [
  {
    path:'', component:AgregarBibliotecarioComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarBibliotecarioRoutingModule { }
