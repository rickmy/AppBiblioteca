import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'cambiarContraseña', loadChildren:()=>import('./cambiar-contrasenia/cambiar-contrasenia.module').then(m=>m.CambiarContraseniaModule)
  },
  {
    path:'historial', loadChildren:()=>import('./historiales/historiales.module').then(m=>m.HistorialesModule)
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
