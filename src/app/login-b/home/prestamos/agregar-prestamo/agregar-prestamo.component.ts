import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { Prestamos} from 'src/app/clases/prestamos'
import { Detalle } from "src/app/clases/detalle-prestamo";


@Component({
  selector: 'app-agregar-prestamo',
  templateUrl: './agregar-prestamo.component.html',
  styleUrls: ['./agregar-prestamo.component.css']
})
export class AgregarPrestamoComponent implements OnInit {

  lector: any
  bibliotecario: any
  texto: any
  prestamos: Prestamos
  ejemplar: any
  detalle: Detalle
  cedulaL : any
  cedulaB: any
  lista: any

  valorLocal: string
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

              
  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.prestamos = {
      codigo: '',
      fechaPrestamo : null,
      idLectores: '',
      fechaMaxEntrega: null,
      idBibliotecario: '',
      observaciones: ''
    }
    this.detalle = {
      idPrestamo :'',
      idEjemplares: ''
    }
    this.ejemplar = {
      id:0,
      codigo : ''
    }
    this.buscarCodigo()
    this.codigoBibliotecario()
  }
  comparar(){
    this.valorLocal=this.local.comparar('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
  }

  codigoBibliotecario(){
    this.cedulaB=this.local.comparar('ingresado')
  }

  buscarLector (){
    this.apiData.postData('/get-lector',{cedula:this.cedulaL}).subscribe(data => {this.lector = data
    console.log(this.lector)
    this.prestamos.idLectores = this.lector.resultado[0].id
    console.log(this.prestamos.idLectores)})
  }
  
  buscarCodigo(){
    this.apiData.postData('/get-general',{tabla:'ejemplares', campos:['ejemplares.id','ejemplares.codigo']})
    .subscribe(data => {this.lista = data
    console.log(this.lista)})
  }

  buscarBibliotecario (){
    this.apiData.postData('/get-bibliotecario',{correo:this.cedulaB}).subscribe(data => {this.bibliotecario = data
    console.log(this.bibliotecario)
    this.prestamos.idBibliotecario = this.bibliotecario.resultado[0].id
    console.log(this.prestamos.idBibliotecario)})
  }

  buscarTexto (){
    this.apiData.postData('/get-ejemplar',{libro:this.ejemplar.codigo}).subscribe(data => {this.texto = data
    console.log(this.texto)
    this.detalle.idEjemplares = this.texto.resultado[0].id
    console.log(this.detalle.idEjemplares)
    })
  }

  comprobar(){
    console.log(this.prestamos.idLectores)
    console.log(this.prestamos.idBibliotecario)
    console.log(this.detalle.idEjemplares)
  }

  limpiarCampos(){
    this.cedulaL = ''
    this.ejemplar = ''
    this.prestamos.codigo =''
    this.prestamos.fechaMaxEntrega = null
    this.prestamos.fechaPrestamo = null
    this.prestamos.observaciones = ''
  } 

  validarCampos(){
    if(this.prestamos.codigo !== '' || this.prestamos.codigo !== undefined){
      if(this.prestamos.fechaPrestamo !== null || this.prestamos.fechaPrestamo !== undefined){
        if(this.cedulaL !== '' || this.cedulaL !== undefined){
          if(this.prestamos.fechaMaxEntrega !==null || this.prestamos.fechaMaxEntrega !== undefined){
            if(this.cedulaB !== '' || this.cedulaB !== undefined){
              if(this.prestamos.observaciones !== '' || this.prestamos.observaciones !== undefined){
                if(this.ejemplar !== '' || this.ejemplar !== undefined){
                  return true
                }
              }
            }
          }
        }
      }
    }
  }

  ingresar(){
    if(this.validarCampos() == true){
      this.buscarBibliotecario()
      this.buscarLector()
      this.buscarTexto()
      if(this.prestamos.idLectores !== '' && this.prestamos.idLectores !== undefined 
      && this.prestamos.idBibliotecario !== '' && this.prestamos.idBibliotecario !== undefined
      && this.detalle.idEjemplares !== '' && this.detalle.idEjemplares !== undefined){
        var prestamos = new Prestamos(this.prestamos.codigo, this.prestamos.fechaPrestamo, this.prestamos.idLectores, this.prestamos.fechaMaxEntrega
          , this.prestamos.idBibliotecario, this.prestamos.observaciones)
          console.log(prestamos)
          this.apiData.postData('/post-prestamos',{campos: prestamos}).subscribe(data => {console.log(data)
            var detalle = new Detalle( this.detalle.idPrestamo, this.detalle.idEjemplares)
            console.log(detalle)
            this.apiData.postData('/post-detalle-prestamo',{campos: detalle.idEjemplares}).subscribe(info => {console.log(info)
              this.apiData.putData('/put-disponibilidad',{idEjemplares: this.detalle.idEjemplares})
              .subscribe(inf => (console.log(inf)))}
            )})
      this.limpiarCampos()   
      }
      else{
        console.log('verifique las cedulas o el texto')
      }
    }else{
      alert('llene los campos')
    }
  }
}
