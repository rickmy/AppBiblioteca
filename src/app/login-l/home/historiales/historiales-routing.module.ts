import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialesComponent } from './historiales.component';


const routes: Routes = [
  {
    path:'', component:HistorialesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialesRoutingModule { }
