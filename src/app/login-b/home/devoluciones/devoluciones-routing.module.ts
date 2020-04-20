import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevolucionesComponent } from './devoluciones.component';


const routes: Routes = [
  {
    path:'', component:DevolucionesComponent
  },
  {
    path:'agregarDevolucion', loadChildren:()=>import('./agregar-devolucion/agregar-devolucion.module').then(m=>m.AgregarDevolucionModule)
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevolucionesRoutingModule { }
