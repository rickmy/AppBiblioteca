import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarContraseniaComponent } from './cambiar-contrasenia.component';


const routes: Routes = [
  {
    path:'', component:CambiarContraseniaComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambiarContraseniaRoutingModule { }
