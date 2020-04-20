import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLComponent } from './login-l.component';



const routes: Routes = [
  {path:'',  component: LoginLComponent},
  {
    path:'homeL', loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginLRoutingModule { }
