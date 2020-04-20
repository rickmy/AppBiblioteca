import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { Ejemplares } from 'src/app/clases/ejemplares';

@Component({
  selector: 'app-agregar-ejemplares',
  templateUrl: './agregar-ejemplares.component.html',
  styleUrls: ['./agregar-ejemplares.component.css']
})
export class AgregarEjemplaresComponent implements OnInit {

  listaTextos = []
  listaStands = []
  listaEstados = []
  listaDisponibilidades = []
  textoSeleccionado: any
  standSeleccionado: any
  estadoConservacionSeleccionado : any
  disponibilidadSeleccionada : any
  ejemplar : Ejemplares
  valorLocal: string

  constructor(private local:LocalStorageService,
              private router: Router,
              private header: HeaderService,
              private apiData: ApiService
              ) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()

    this.verListaTextos()
    this.verListaStands()
    this.verListaDisponibilidades()
    this.verListaEstados()

    this.ejemplar={
      codigo:'',
      idTextos:0,
      fechaPublicacion:0,
      idStand:0,
      idEstadoConservaciones:0,
      idDisponibilidad:0
    }

    this.textoSeleccionado={
      id:0,
      titulo:''
    }

    this.standSeleccionado={
      id:0,
      stand:''
    }

    this.estadoConservacionSeleccionado={
      id:0,
      estadoConservacion:''
    }

    this.disponibilidadSeleccionada={
      id:0,
      disponibilidad:''
    }

  }

  verListaTextos(){
    this.apiData.postData('/get-general',{campos:['id','titulo'],tabla:'textos'})
    .subscribe((data:any[])=> this.listaTextos = data)
  }

  verListaStands(){
    this.apiData.postData('/get-general',{campos:['id','stand'],tabla:'stand'})
    .subscribe((data:any[])=> this.listaStands = data)
  }

  verListaEstados(){
    this.apiData.postData('/get-general',{campos:['id','estadoConservacion'],tabla:'estadoConservaciones'})
    .subscribe((data:any[])=> this.listaEstados = data)
  }

  verListaDisponibilidades(){
    this.apiData.postData('/get-general',{campos:['id','disponibilidad'],tabla:'disponibilidades'})
    .subscribe((data:any[])=> this.listaDisponibilidades = data)
  }

  ingresarEjemplar(){
    let codigo = this.ejemplar.codigo
    let idTextos = this.textoSeleccionado.id
    let fechaPublicacion = this.ejemplar.fechaPublicacion
    let idStand = this.standSeleccionado.id
    let idEstadoConservaciones = this.estadoConservacionSeleccionado.id
    let idDisponibilidad = this.disponibilidadSeleccionada.id

    if(this.validarCampos(codigo) === true && this.validarCampos(fechaPublicacion) === true 
    && this.validarCampos(idTextos) === true && idTextos > 0
    && this.validarCampos(idStand) === true && idStand > 0
    && this.validarCampos(idEstadoConservaciones) === true && idEstadoConservaciones > 0
    && this.validarCampos(idDisponibilidad) === true && idDisponibilidad > 0){
      let nuevoEjemplar = new Ejemplares(codigo,idTextos,fechaPublicacion,idStand,idEstadoConservaciones,idDisponibilidad)
      console.log(nuevoEjemplar)
      this.apiData.postData('/ingresar-datos',{campos:nuevoEjemplar,tabla:'ejemplares'})
      .subscribe(data => console.log(data)) 

    }else{
      alert('Ingrese Todos los Datos Solicitados')
    }
  }

  validarCampos(campo){
    if(campo !== '' && campo !== undefined){
      return true
    }else{
      return false
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

  comprobar(){
    let locale =this.local.comparar('user')
    let Local =this.local.comparar('ingresado')
    console.log(locale)

    console.log(Local)
    if(Local !== '' || Local !== undefined  ){
      if(locale == '2' ){
        console.log('nada q ver')
      }
      else{if(locale == '1'){
          this.router.navigate(['lector'])
          console.log('aun no hay nada que ver')
        }  
        this.router.navigate(['bibliotecario'])      
      }
    }else{
      this.router.navigate(['bibliotecario'])
    }
  }



}
