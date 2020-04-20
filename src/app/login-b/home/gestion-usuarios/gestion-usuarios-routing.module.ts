import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios.component';


const routes: Routes = [
  {
    path:'', component:GestionUsuariosComponent
  },
  {
    path:'agregarBibliotecario', loadChildren:()=>import('./agregar-bibliotecario/agregar-bibliotecario.module').then(m=>m.AgregarBibliotecarioModule)
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUsuariosRoutingModule { }
