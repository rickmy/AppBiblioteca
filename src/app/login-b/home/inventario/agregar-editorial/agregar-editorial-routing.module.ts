import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarEditorialComponent } from './agregar-editorial.component';


const routes: Routes = [
  {
    path:'',component:AgregarEditorialComponent
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarEditorialRoutingModule { }
