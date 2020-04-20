import { Component, OnInit } from '@angular/core';
import { Nacionalidades } from 'src/app/clases/nacionalidades';
import { ApiService } from 'src/app/servicio/api.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';

@Component({
  selector: 'app-agregar-nacionalidad',
  templateUrl: './agregar-nacionalidad.component.html',
  styleUrls: ['./agregar-nacionalidad.component.css']
})
export class AgregarNacionalidadComponent implements OnInit {

  nacionalidad: Nacionalidades
  valorLocal: string

  constructor(private apiData : ApiService,
              private router : Router,
              private header : HeaderService,
              private local:LocalStorageService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true

    this.comparar()

    this.nacionalidad={
      nacionalidad:''
    }
  }
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
  }

  ingresarNacionalidad(){
    let nombreNacionalidad = this.nacionalidad.nacionalidad

    let nacionalidad = new Nacionalidades(nombreNacionalidad)

    this.apiData.postData('/ingresar-datos',{campos:nacionalidad,tabla:'nacionalidades'}).subscribe(data=>console.log(data))
    this.router.navigate(['bibliotecario','homeB','inventario'])
  }

}
