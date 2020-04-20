import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentB } from './home.component';


const routes: Routes = [
  {
    path:'', component:HomeComponentB
  },
  {
    path:'prestamos', loadChildren:()=>import('./prestamos/prestamos.module').then(m=>m.PrestamosModule)
  },
  {
    path:'devoluciones', loadChildren:()=>import('./devoluciones/devoluciones.module').then(m=>m.DevolucionesModule)
  },
  {
    path:'usuarios', loadChildren:()=>import('./gestion-usuarios/gestion-usuarios.module').then(m=>m.GestionUsuariosModule)
  },
  {
    path:'inventario', loadChildren:()=>import('./inventario/inventario.module').then(m=>m.InventarioModule)
  },
  {
    path:'cambiarContraseña', loadChildren:()=>import('./cambiar-contrasenia/cambiar-contrasenia.module').then(m=>m.CambiarContraseniaModule)
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
