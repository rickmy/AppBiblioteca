import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { Textos } from 'src/app/clases/textos';

@Component({
  selector: 'app-agregar-texto',
  templateUrl: './agregar-texto.component.html',
  styleUrls: ['./agregar-texto.component.css']
})
export class AgregarTextoComponent implements OnInit {

  listaEditoriales = []
  listaTipoTextos = []
  listaAutores = []
  valorLocal: string
  editorialSeleccionado : any
  tipoTextoSeleccionado : any
  autorUnoSeleccionado: any
  autorDosSeleccionado : any
  autorTresSeleccionado : any
  autorAdicionalUno : boolean
  autorAdicionalDos : boolean
  btnAgregarUno : boolean
  btnAgregarDos  : boolean
  btnOcultarUno : boolean
  btnOcultarDos : boolean
  texto : Textos

  constructor(private local:LocalStorageService,
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()

    this.autorAdicionalUno = false
    this.autorAdicionalDos = false
    
    this.btnAgregarUno = true
    this.btnAgregarDos = false
    this.btnOcultarUno = false
    this.btnOcultarDos = false

    this.verListaEditoriales()
    this.verListaTipoTextos()
    this.verListaAutores()

    this.texto ={
      codigo:'',
      titulo:'',
      idEditoriales:0,
      idTipoTextos:0,
      descripcion:''
    }

    this.editorialSeleccionado={
      id:0,
      editorial:''
    }

    this.tipoTextoSeleccionado={
      id:0,
      tipoTexto:''
    }

    this.autorUnoSeleccionado={
      id:0,
      autor:''
    }
    
    this.autorDosSeleccionado={
      id:0,
      autor:''
    }

    this.autorTresSeleccionado={
      id:0,
      autor:''
    }
    
  }
  
  verListaEditoriales(){
    this.apiData.postData('/get-general',{campos:['id','editorial'],tabla:'editoriales'})
    .subscribe((data:any[])=> this.listaEditoriales = data)
  }
  
  verListaTipoTextos(){
    this.apiData.postData('/get-general',{campos:['id','tipoTexto'],tabla:'tipoTextos'})
    .subscribe((data:any[])=> this.listaTipoTextos = data)
  }

  verListaAutores(){
    this.apiData.postData('/get-general',{campos:['id','nombre','apellido'],tabla:'autores'})
    .subscribe((data:any[])=> this.listaAutores = data)
  }

  mostrarAutorUno(){
    this.autorAdicionalUno = true
    this.autorAdicionalDos = false
    
    this.btnAgregarUno = false
    this.btnOcultarUno = true
    this.btnAgregarDos = true
  }

  mostrarAutorDos(){
    this.autorAdicionalUno = true
    this.autorAdicionalDos = true
    
    this.btnAgregarUno = false
    this.btnOcultarUno = false
    this.btnAgregarDos = false
    this.btnOcultarDos = true
  }

  ocultarAutorDos(){
    this.autorAdicionalUno = true
    this.autorAdicionalDos = false
    
    this.btnAgregarUno = false
    this.btnOcultarUno = true
    this.btnAgregarDos = true
    this.btnOcultarDos = false
  }

  ocultarAutorUno(){
    this.autorAdicionalUno = false
    this.autorAdicionalDos = false
    
    this.btnAgregarUno = true
    this.btnOcultarUno = false
    this.btnAgregarDos = false
    this.btnOcultarDos = false
  }

  ingresarTexto(){
    let codigo = this.texto.codigo
    let titulo = this.texto.titulo
    let idEditoriales = this.editorialSeleccionado.id
    let idTipoTextos = this.tipoTextoSeleccionado.id
    let descripcion = this.texto.descripcion
    let idAutorUno = this.autorUnoSeleccionado.id
    let idAutorDos = this.autorDosSeleccionado.id
    let idAutorTres = this.autorTresSeleccionado.id
    
    
    if(this.validarCampos(codigo) === true && this.validarCampos(titulo) === true 
    && this.validarCampos(idEditoriales) === true && idEditoriales > 0
    && this.validarCampos(idTipoTextos) === true && idTipoTextos > 0
    && this.validarCampos(idAutorUno) == true && idAutorUno > 0
    && this.validarCampos(descripcion) === true){
      let nuevoTexto = new Textos(codigo,titulo,idEditoriales,idTipoTextos,descripcion)
      console.log(nuevoTexto)
      console.log(idAutorUno,idAutorDos,idAutorTres)

      this.apiData.postData('/ingresar-datos',{campos:nuevoTexto,tabla:'textos'})
      .subscribe(data => {
        console.log(data)
        if(data !== false){
          if(this.validarCampos(idAutorUno) === true && idAutorUno > 0){
            this.apiData.postData('/post-textos-autores',{'codigo':codigo,'autor':idAutorUno})
            .subscribe(data => console.log(data)) 
          }
          
          
          if(this.validarCampos(idAutorDos) === true && idAutorDos > 0){
            this.apiData.postData('/post-textos-autores',{'codigo':codigo,'autor':idAutorDos})
            .subscribe(data => console.log(data)) 
          } else {
            return false
          }
    
          if(this.validarCampos(idAutorTres) === true && idAutorTres > 0){
            this.apiData.postData('/post-textos-autores',{'codigo':codigo,'autor':idAutorTres})
            .subscribe(data => console.log(data)) 
          } else {
            return false
          }  
        }
      }) 
      
        



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
