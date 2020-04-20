import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicio/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  
  valorLocal: string
  busqueda = new FormControl('')
  list : any
  filtroValor:string
  
 
  

  constructor(private apiData : ApiService ,
              private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService) { }

  ngOnInit() {
    
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true

    this.comparar()

    this.busqueda.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor => this.busquedaIngresada(valor))

    this.listUsuarios()

  }
  busquedaIngresada(valor:string){
    this.filtroValor = valor
  }

  listUsuarios(){

    this.apiData.postData('/get-activos',{campos:['cedula','primerNombre','segundoNombre','primerApellido',
                                                  'segundoApellido','correo','telefonoCelular'],tabla:'usuarios'})
                                                  .subscribe(getData => this.list = getData)
  }
  
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
  }

  pagAgregarBibliotecario(){
    this.router.navigate(['bibliotecario','homeB','usuarios','agregarBibliotecario'])
  }

}
