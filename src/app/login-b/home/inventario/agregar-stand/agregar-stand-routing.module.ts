import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarStandComponent } from './agregar-stand.component';


const routes: Routes = [
  {
  path:'', component:AgregarStandComponent
  },
{
  path:'**', redirectTo:''
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarStandRoutingModule { }
