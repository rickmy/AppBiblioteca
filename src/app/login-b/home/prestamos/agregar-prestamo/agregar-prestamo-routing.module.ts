import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarPrestamoModule } from './agregar-prestamo.module';
import { AgregarPrestamoComponent } from './agregar-prestamo.component';


const routes: Routes = [
  {
    path:'', component: AgregarPrestamoComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarPrestamoRoutingModule { }
