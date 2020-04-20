import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { Editoriales } from 'src/app/clases/editoriales';

@Component({
  selector: 'app-agregar-editorial',
  templateUrl: './agregar-editorial.component.html',
  styleUrls: ['./agregar-editorial.component.css']
})
export class AgregarEditorialComponent implements OnInit {

  valorLocal: string
  editorial: Editoriales
  constructor(private local:LocalStorageService,
              private router: Router,
              private header : HeaderService,
              private apiData : ApiService
    ) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()

    this.editorial ={
      editorial:''
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

  ingresarEditorial(){
    let nombreEditorial = this.editorial.editorial

    let editorial = new Editoriales(nombreEditorial)
    console.log(editorial)
    this.apiData.postData('/ingresar-datos',{campos:editorial,tabla:'editoriales'}).subscribe(data=>console.log(data))
    this.router.navigate(['bibliotecario','homeB','inventario'])
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
