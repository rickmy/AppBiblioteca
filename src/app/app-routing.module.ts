import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path:'', redirectTo:'bibliotecario',pathMatch:'full'
  },
  { 
    path:'lector', 
    loadChildren:()=>import('./login-l/login-l.module').then(m=>m.LoginLModule)
  },
  {
    path:'bibliotecario', 
    loadChildren:()=>import('./login-b/login-b.module').then(m=>m.LoginBModule)
  },
  {
    path:'**', redirectTo:'bibliotecario'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
