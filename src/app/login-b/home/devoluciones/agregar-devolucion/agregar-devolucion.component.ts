import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import {Devoluciones} from 'src/app/clases/devoluciones'
import { ApiService } from 'src/app/servicio/api.service';


@Component({
  selector: 'app-agregar-devolucion',
  templateUrl: './agregar-devolucion.component.html',
  styleUrls: ['./agregar-devolucion.component.css']
})
export class AgregarDevolucionComponent implements OnInit {

  valorLocal: string
  devoluciones:Devoluciones
  correoBibliotecario: any
  bibliotecario : any
  list = []
  devol : any

  constructor(private local:LocalStorageService, 
    private router: Router,
    private header: HeaderService,
    private apiData: ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.devoluciones={
      codigo:"",
      idPrestamos:"",
      fechaDevolucion:null,
      idBibliotecario:"",
      observaciones:""
    }
    this.obtenerCorreo()
    this.obtenerCodigoCorreo()
    this.obtenerCodigoPrestamo()
    this.devol = {
      id:0,
      codigo:''
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

  agregarDevolucion(){
    var devoluciones=new Devoluciones(this.devoluciones.codigo,this.devol.id,this.devoluciones.fechaDevolucion,this.devoluciones.idBibliotecario,this.devoluciones.observaciones)
    this.apiData.postData('/postDevoluciones',{campos:devoluciones}).subscribe(data => console.log(data))
    
  }

  obtenerCorreo(){
    this.correoBibliotecario = this.local.comparar('ingresado')
  }

  obtenerCodigoCorreo(){
    this.apiData.postData('/get-bibliotecario',{correo: this.correoBibliotecario})
    .subscribe(data => {this.bibliotecario=data
    console.log(this.bibliotecario.resultado)
    this.devoluciones.idBibliotecario = this.bibliotecario.resultado[0].id})
    console.log(this.devoluciones.idBibliotecario)
  }

  obtenerCodigoPrestamo(){
    this.apiData.getData('/leer-prestamos')
    .subscribe((data:any[]) => {this.list = data
    console.log(this.list)
    })
  }
}

