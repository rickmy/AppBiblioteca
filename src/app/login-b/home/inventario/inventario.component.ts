import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { FormControl } from '@angular/forms';
import { Autores } from 'src/app/clases/autores';
import { debounceTime, auditTime } from 'rxjs/operators';
import { Editoriales } from 'src/app/clases/editoriales';
import { Textos } from 'src/app/clases/textos';
import { Ejemplares } from 'src/app/clases/ejemplares';
import { Stands } from 'src/app/clases/stands';
import { Nacionalidades } from 'src/app/clases/nacionalidades';
import { TipoTextos } from 'src/app/clases/tipo-textos';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

//tablas de listado de cada modulo
  divAutores : boolean
  divEditoriales: boolean
  divTipoTextos: boolean
  divNacionalidades : boolean
  divStands : boolean
  divTextos: boolean
  divEjemplares : boolean
//formularios de actualización
  divActAutores : boolean
  divActEditoriales : boolean
  divActTipoTextos: boolean
  divActNacionalidades : boolean
  divActStands : boolean
  divActTextos : boolean
  divActEjemplares : boolean
//extras para el funcionamiento de los formularios de actualizaciones
  nuevaNacionalidad : boolean
  btnNuevaNac : boolean
  btnOcultar : boolean
//variable para el buscador
  filtroSeleccionado : any
  busqueda = new FormControl('')
  busquedaTxt = new FormControl('')
  busquedaEjemplar = new FormControl('') 
  busquedaEditorial = new FormControl('')
  busquedaTipoTxt = new FormControl('')
  busquedaNacionalidad = new FormControl('')
  busquedaStand = new FormControl('')
  filtroValor:string
//variable para el funcionmiento del local storage
  valorLocal: string
//arrays para listar cada modulo
  listaFiltros = []
  lista = []
  listaNacionalidades = []
  listaEditoriales = []
  
  //instancias para las actulizaciones
  autorSelect :Autores 
  editorialSelect : Editoriales
  textoSelect : Textos
  ejemplarSelect : Ejemplares
  standSelect : Stands
  nacionalidadSelect : Nacionalidades
  tipoTxtSelect : TipoTextos

  
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData: ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    
    
    this.listaFiltros=[
      {id:0,filtro:'Buscar por:'},
      {id:1,filtro:'Nombre'},
      {id:2,filtro:'Apellido'},
      {id:3,filtro:'Nacionalidad'}
    ]

    this.filtroSeleccionado={
      id:0,
      filtro:''
    }

    this.comparar()
    this.pagAutores()

    this.busqueda.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor => this.busquedaIngresada(valor));

    this.busquedaTxt.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaTxtIng(valor)
    )

    this.busquedaEjemplar.valueChanges
    .pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaEjemplarIng(valor)
    )

    this.busquedaEditorial.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaEditorialIng(valor)
    )

    this.busquedaTipoTxt.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaTipoTxtIng(valor)
    )

    this.busquedaNacionalidad.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaNacionalidadIng(valor)
    )

    this.busquedaStand.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      valor => this.busquedaStandIng(valor)
    )

  }
//direccionamiento a cada listado
  pagAutores(){
    this.divAutores = true
    this.divEditoriales = false
    this.divNacionalidades = false
    this.divTipoTextos = false
    this.divStands = false
    this.divEjemplares = false
    this.divTextos = false
    this.btnNuevaNac= false
    this.nuevaNacionalidad = false
    this.btnOcultar = false
    this.divActAutores = false
    this.divActEditoriales = false
    this.divActTipoTextos= false
    this.divActNacionalidades = false
    this.divActStands = false
    this.divActTextos = false
    this.divActEjemplares = false

    this.verListaAutores()
    this.verListaNacionalidades()
    
  }

  pagEditoriales(){
    this.divAutores =false
    this.divEditoriales = true
    this.divNacionalidades = false
    this.divTipoTextos = false
    this.divStands = false
    this.divEjemplares = false
    this.divTextos = false
    this.verListaEditoriales();
  }

  pagTipoTextos(){
    this.divEditoriales = false
    this.divTipoTextos = true
    this.divNacionalidades = false
    this.divAutores = false
    this.divStands = false
    this.divEjemplares = false
    this.divTextos = false
    this.verListaTipoTextos()
  }

  pagNacionalidades(){
    this.divEditoriales = false
    this.divTipoTextos = false
    this.divNacionalidades = true
    this.divAutores = false
    this.divStands= false
    this.divEjemplares = false
    this.divTextos = false
    this.verListaNacionalidades()
  }

  pagStands(){
    this.divEditoriales = false
    this.divTipoTextos = false
    this.divNacionalidades = false
    this.divAutores = false
    this.divStands = true
    this.divEjemplares = false
    this.divTextos = false
    this.verListaStands()
  }

  pagTextos(){
    this.divAutores = false
    this.divEditoriales = false
    this.divNacionalidades = false
    this.divTipoTextos = false
    this.divStands = false
    this.divEjemplares = false
    this.divTextos = true
    this.verListaTextos();
  }

  pagEjemplares(){
    this.divAutores = false
    this.divEditoriales = false
    this.divNacionalidades = false
    this.divTipoTextos = false
    this.divStands = false
    this.divEjemplares = true
    this.divTextos = false
    this.verListaEjemplares()
  }
//funcion para el buscador
  busquedaIngresada(valor:string){
   
    //console.log(this.filtroSeleccionado.id)
    this.filtroValor = valor

    if(this.filtroSeleccionado.id === 0
      && this.filtroValor  !== '' && this.filtroValor !== undefined){
      return  this.filtroSeleccionado.id === 0,
      this.lista = this.lista.filter( res =>{
        return res.nombre.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    }

    if( this.filtroSeleccionado.id === 1 
      && this.filtroValor  !== '' && this.filtroValor !== undefined){
      return  this.filtroSeleccionado.id === 1,
      this.lista = this.lista.filter( res =>{
        return res.nombre.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    }

    if(this.filtroSeleccionado.id === 2 && this.filtroValor  !== '' && this.filtroValor !== undefined){
      return  this.filtroSeleccionado.id === 2,
      this.lista = this.lista.filter( res =>{
        return res.apellido.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    }

    if(this.filtroSeleccionado.id === 3 && this.filtroValor  !== '' && this.filtroValor !== undefined){
      return  this.filtroSeleccionado.id === 3,
      this.lista = this.lista.filter( res =>{
        return res.nacionalidad.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    }
    
    
    return this.pagAutores()

  }

  busquedaTxtIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined ){
      this.lista = this.lista.filter(res =>{
        return res.titulo.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    }else{
      return this.pagTextos()
    }
  }

  busquedaEjemplarIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.lista = this.lista.filter(res => {
        return res.codigo.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.pagEjemplares()
    }
  }

  busquedaEditorialIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.lista = this.lista.filter(res => {
        return res.editorial.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.pagEditoriales()  
    }
  }

  busquedaTipoTxtIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.lista = this.lista.filter(res => {
        return res.tipoTexto.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.pagTipoTextos()  
    }
  }

  busquedaNacionalidadIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.listaNacionalidades = this.listaNacionalidades.filter(res => {
        return res.nacionalidad.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.pagNacionalidades()  
    }
  }

  busquedaStandIng(valor:string){
    this.filtroValor = valor

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.lista = this.lista.filter(res => {
        return res.stand.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.pagStands()  
    }
  }

//funcion para el local storage

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

//listas de cada modulo
  verListaAutores(){
    this.apiData.getData('/get-autores').subscribe((data:any[])=> this.lista = data)
  }

  verListaEditoriales(){
    this.apiData.postData('/get-general',{campos:['id','editorial'],tabla:'editoriales'}).subscribe((data:any[])=> this.lista = data)
  }

  verListaTipoTextos(){
    this.apiData.postData('/get-general',{campos:['id','tipoTexto'],tabla:'tipoTextos'}).subscribe((data:any[])=> this.lista = data)
  }

  verListaNacionalidades(){
    this.apiData.postData('/get-general',{campos:['id','nacionalidad'],tabla:'nacionalidades'}).subscribe((data:any[])=> this.listaNacionalidades = data)
  }

  verListaStands(){
    this.apiData.postData('/get-general',{campos:['id','stand'],tabla:'stand'}).subscribe((data:any[])=> this.lista = data)
  }

  verListaTextos(){
    this.apiData.getData('/get-textos').subscribe((data:any[]) => this.lista = data)
  }

  verListaEjemplares(){
    this.apiData.getData('/get-ejemplares').subscribe((data:any) => this.lista = data)
  }

  //eliminado logico para todos los modulos

  eliminar(idIng:number,tablaIng:string){
    console.log(idIng,tablaIng)
    
    if(idIng>0 && tablaIng !== ""){
      Swal.fire({
        title:'¿Estás seguro de eliminar?',
        text:'No se podrá revertir esta acción',
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        confirmButtonText:'Si,eliminar'
      }).then(result =>{
        console.log(result)
        if(result.value){

          this.apiData.putData('/eliminado-logico',{id:idIng,tabla:tablaIng}).subscribe(
            data=>data)
          Swal.fire('Elimación','Registro Eliminado','success')
          return this.ngOnInit()
        }
      })
    }
    
    
    
  }

  //para abrir el fomrulario de actualizacion

  pagActualizar(autor:Autores){
    this.autorSelect = autor

    console.log(this.autorSelect)
    this.divActAutores = true
    this.btnNuevaNac = true

  }
  //componentes de la act de autores
  pagCamNa(){
    this.nuevaNacionalidad=true
    this.btnNuevaNac = false
    this.btnOcultar = true
  }

  ocultarPagCam(){
    this.nuevaNacionalidad=false
    this.btnNuevaNac = true
    this.btnOcultar = false
  }

  pagActualizarEditorial(editoriales:any){
    this.divActEditoriales = true
    this.editorialSelect = editoriales
  }

  pagActualizarStand(stand:any){
    this.divActStands = true
    this.standSelect = stand
  }

  pagActualizarNacionalidad(nacionalidad:any){
    this.divActNacionalidades = true
    this.nacionalidadSelect = nacionalidad
  }

  pagActualizarTipoTxt(tipo:any){
    this.divActTipoTextos = true
    this.tipoTxtSelect = tipo
  }

  //para la vlaidacion de inputs

  validarInputs(campo){
    if(campo !== ""){
      return true
    }else{
      return false
    }
  }

  //para actulizar a cada capos de los diferentes modulos

  actualizarAutor(autor:any){
    console.log(autor)
    let idAutor = autor.id
    let nacionalidad = autor.nacionalidad
    let nombreAutor = autor.nombre
    let apellidoAutor = autor.apellido

    if(this.nuevaNacionalidad === true ){
      console.log(autor.idNacionalidades)
      if(autor.idNacionalidades !== undefined){
        let idNacionalidades = autor.idNacionalidades.id
        let nombreNacionalidad = autor.idNacionalidades.nacionalidad

        if(idNacionalidades !== undefined && idNacionalidades > 0){
          Swal.fire({
            title:'¿Estás seguro de actualizar?',
            text:'El cambio sera guardado permanentemente',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'blue',
            cancelButtonColor:'#d33',
            cancelButtonText:'Cancelar',
            confirmButtonText:'Si,actualizar'
          }).then(result =>{
            console.log(result)
            if(result.value){
              this.apiData.putData('/actualizar-datos',{tabla:'autores',campos:{id:autor.id,nombre:autor.nombre,apellido:autor.apellido,idNacionalidades:idNacionalidades}})
          .subscribe(data =>console.log(data))
              Swal.fire('Actualización','Registro Actualizado','success')
            }
          })
        }else{
          Swal.fire({
            title:'Alerta',
            text:'Ingrese los datos solicitados',
            icon:'info',
            confirmButtonText:'OK',
            confirmButtonColor:'blue'
          }).then(res =>{
            console.log(res)
          })
        }
      } else {
        Swal.fire({
          title:'Alerta',
          text:'Ingrese los datos solicitados',
          icon:'info',
          confirmButtonText:'OK',
          confirmButtonColor:'blue'
        }).then(res =>{
          console.log(res)
        })
      }

    } else {
      Swal.fire({
        title:'¿Estás seguro de actualizar?',
        text:'El cambio sera guardado permanentemente',
        icon:'warning',
        showCancelButton:true,
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText:'Si,actualizar'
      }).then(result =>{
        console.log(result)
        if(result.value){
          this.apiData.putData('/actualizar-datos',{tabla:'autores',campos:{id:autor.id,nombre:autor.nombre,apellido:autor.apellido}})
          .subscribe(data =>console.log(data))
          Swal.fire('Actualización','Registro Actualizado','success')
        }
      })
    }

     
  }

  actualizarEditorial(editoriales:any){
    let idEditorial = editoriales.id
    let nombreEditorial = editoriales.editorial
    if(this.validarInputs(nombreEditorial)===true && idEditorial > 0){
      Swal.fire({
        title:'¿Estás seguro de actualizar?',
        text:'El cambio sera guardado permanentemente',
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        confirmButtonText:'Si,actualizar'
      }).then(result =>{
        console.log(result)
        if(result.value){
          console.log(editoriales)
          this.apiData.putData('/actualizar-datos',{tabla:'editoriales',campos:editoriales})
          .subscribe(data =>console.log(data))
          Swal.fire('Actualización','Registro Actualizado','success')
          return this.ngOnInit()
        }
      })
    
    }else{
      Swal.fire({
        title:'Alerta',
        text:'Ingrese los datos solicitados',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        console.log(res)
      })
    }
  }

  actualizarStand(stand:any){
    let idStand = stand.id
    console.log(idStand,stand)
    if(idStand >0 && stand.stand !== ''){
      Swal.fire({
        title:'¿Estás seguro de actualizar?',
        text:'El cambio sera guardado permanentemente',
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        confirmButtonText:'Si,actualizar'
      }).then(result =>{
        console.log(result)
        if(result.value){
          this.apiData.putData('/actualizar-datos',{tabla:'stand',campos:stand})
          .subscribe(data =>console.log(data))
          Swal.fire('Actualización','Registro Actualizado','success')
        }
      })
    }
  }

  actualizarNacionalidad(nacionalidad:any){
    let idNacionalidad = nacionalidad.id
    if(idNacionalidad >0 && nacionalidad.nacionalidad !== ''){
      Swal.fire({
        title:'¿Estás seguro de actualizar?',
        text:'El cambio sera guardado permanentemente',
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        confirmButtonText:'Si,actualizar'
      }).then(result =>{
        console.log(result)
        if(result.value){
          this.apiData.putData('/actualizar-datos',{tabla:'nacionalidades',campos:nacionalidad})
          .subscribe(data =>console.log(data))
          Swal.fire('Actualización','Registro Actualizado','success')
        }
      })
    }
  }

  actualizarTipoTxt(tipo:any){
    let idTipo = tipo.id
    if(idTipo >0 && tipo.tipoTexto !== ''){
      Swal.fire({
        title:'¿Estás seguro de actualizar?',
        text:'El cambio sera guardado permanentemente',
        icon:'warning',
        showCancelButton:true,
        cancelButtonText:'Cancelar',
        confirmButtonColor:'blue',
        cancelButtonColor:'#d33',
        confirmButtonText:'Si,actualizar'
      }).then(result =>{
        console.log(result)
        if(result.value){
          this.apiData.putData('/actualizar-datos',{tabla:'tipotextos',campos:tipo})
          .subscribe(data =>console.log(data))
          Swal.fire('Actualización','Registro Actualizado','success')
        }
      })
    }
  }

//para el dirigir al formulario de agegar un nuevo campo en el modulo

  pagAgregarEditorial(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarEditorial'])
  }

  pagAgregarTipoTexto(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarTipoTexto'])
  }

  pagAgregarNacionalidad(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarNacionalidad'])
  }
  
  pagAgregarAutor(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarAutor'])
  }

  pagAgregarStand(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarStand'])
  }

  pagAgregarTexto(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarTexto'])
  }

  pagAgregarEjemplar(){
    this.router.navigate(['bibliotecario','homeB','inventario','agregarEjemplar'])
  }

  
  
}
