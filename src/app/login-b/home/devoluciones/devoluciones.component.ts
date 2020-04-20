import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  list=[]

  busqueda=new FormControl('') 
  valorLocal: string
  filtroValor:string
  
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.verListaDevoluciones()
    this.busqueda.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor=>this.busquedaIng(valor)
    )
  }
  busquedaIng(valor:string){
   this.filtroValor=valor
   if(this.filtroValor !=='' && this.filtroValor !==undefined){
     this.list=this.list.filter(res=>{
       return res.primerNombre.tolowerCase().match(this.filtroValor).tolowerCase()
     })
   }else{
     return this.ngOnInit()
   }
  }

  verListaDevoluciones(){
    this.apiData.getData('/getDevoluciones').subscribe((data:any[])=>{
      this.list=data
    })
  }
  
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
  }

}
