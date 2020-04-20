import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { TipoTextos } from 'src/app/clases/tipo-textos';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-agregar-tipo-texto',
  templateUrl: './agregar-tipo-texto.component.html',
  styleUrls: ['./agregar-tipo-texto.component.css']
})
export class AgregarTipoTextoComponent implements OnInit {
  tipoTexto : TipoTextos
  valorLocal: string
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.tipoTexto ={
      tipoTexto : ''
    }
  }

  ingresarTipoTexto(){
    let nombreTipoTexto = this.tipoTexto.tipoTexto

    let nuevoTipo = new TipoTextos(nombreTipoTexto)
    this.apiData.postData('/ingresar-datos',{campos:nuevoTipo,tabla:'tipoTextos'}).subscribe(data=>console.log(data))
    this.router.navigate(['bibliotecario','homeB','inventario'])
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
