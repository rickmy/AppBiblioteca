import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario.component';


const routes: Routes = [
  {
    path:'', component:InventarioComponent
  },
  {
    path:'agregarAutor', loadChildren:()=>import('./agregar-autor/agregar-autor.module').then(m=>m.AgregarAutorModule)
  },
  {
    path:'agregarEditorial', loadChildren:()=>import('./agregar-editorial/agregar-editorial.module').then(m=>m.AgregarEditorialModule)
  },
  {
    path:'agregarTexto', loadChildren:()=>import('./agregar-texto/agregar-texto.module').then(m=>m.AgregarTextoModule)
  },
  {
    path:'agregarEjemplar', loadChildren:()=>import('./agregar-ejemplares/agregar-ejemplares.module').then(m=>m.AgregarEjemplaresModule)
  },
  {
    path:'agregarTipoTexto', loadChildren:()=>import('./agregar-tipo-texto/agregar-tipo-texto.module').then(m=>m.AgregarTipoTextoModule)
  },
  {
    path:'agregarNacionalidad', loadChildren:()=>import('./agregar-nacionalidad/agregar-nacionalidad.module').then(m=>m.AgregarNacionalidadModule)
  },
  {
    path:'agregarStand', loadChildren:()=>import('./agregar-stand/agregar-stand.module').then(m=>m.AgregarStandModule)
  },
  {
    path:'**', redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
