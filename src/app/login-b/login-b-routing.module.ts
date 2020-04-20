import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginBComponent } from './login-b.component';



const routes: Routes = [
  {path:'', component:LoginBComponent},
  {path:'homeB', loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginBRoutingModule { }
