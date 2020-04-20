import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { Autores } from 'src/app/clases/autores';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {

  selectedFiles : File[]
  formData : FormData
  lista = []
  autor: Autores
  seleccionado : any
  valorLocal: string
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.verListaNacionalidad()
    this.autor={
      nombre:'',
      apellido:'',
      idNacionalidades:0
    }
    this.seleccionado={
      id:0,
      nacionalidad : ''
    }
    console.log(this.seleccionado.id)
    

    this.formData
  }
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
    
  }

  onFileSelected(e){
    console.log(e.target)
    this.selectedFiles = e.target.files
    console.log(this.selectedFiles)

  }

  onUpload(){
    console.log('subido')
      console.log(this.selectedFiles)
      console.log(this.selectedFiles.length)
      let img = this.selectedFiles[0]
      let name  = this.selectedFiles[0].name
      console.log(img)
      console.log(name)
      
      if(this.selectedFiles.length > 0){
      
      
      this.formData.append('upload',img)
      //this.apiData.postFile('/subir-imagen',this.formData).subscribe( res => {console.log(res)})
      console.log(this.formData)
      }else{
        console.log('spm')
      } 
    
    
  }

  ingresarAutor(){
    
    let nombre = this.autor.nombre
    let apellido = this.autor.apellido
    let idNacionalidad = this.seleccionado.id

    let autor = new Autores(nombre,apellido,idNacionalidad)

    console.log( autor)
    this.apiData.postData('/ingresar-datos',{campos:autor,tabla:'autores'})
    .subscribe(data=>console.log(data))
    this.router.navigate(['bibliotecario','homeB','inventario'])
  }
  
  verListaNacionalidad(){
    this.apiData.postData('/get-general',{campos:['id','nacionalidad'],tabla:'nacionalidades'})
    .subscribe((data:any[])=> this.lista = data)
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
