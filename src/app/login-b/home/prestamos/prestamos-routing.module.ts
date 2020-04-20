import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrestamosModule } from './prestamos.module';
import { PrestamosComponent } from './prestamos.component';



const routes: Routes = [
  {
    path:'', component: PrestamosComponent
  },
  {
    path:'agregarPrestamo', loadChildren:()=>import('./agregar-prestamo/agregar-prestamo.module').then(m=>m.AgregarPrestamoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamosRoutingModule { }
