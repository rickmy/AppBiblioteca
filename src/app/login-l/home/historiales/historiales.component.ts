import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {
  valorLocal: string
  correo: any
  lista:any
  constructor(private local:LocalStorageService,
              private router: Router,
              private header: HeaderService
              , private apiData: ApiService) { 

              }

  ngOnInit() {

    this.header.verHeaderBibliotecario = true
    this.header.verHeaderLector = false
    this.comparar()
  }
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['lector'])
    }
  }
  comprobar(){
    let locale =this.local.comparar('user')
    let Local =this.local.comparar('ingresado')
    console.log(locale)

    console.log(Local)
    if(Local !== '' || Local !== undefined  ){
      if(locale == '1' ){
        console.log('puto')
      }
      else{if(locale == '2'){
          this.router.navigate(['bibliotecario'])
          console.log('otro puto')
        }  
        this.router.navigate(['lector'])      
      }
    }else{
      this.router.navigate(['lector'])
    }
  }
  buscarCorreo(){
    this.correo = this.local.comparar('ingresado')
    console.log(this.correo)
  }
  getHistorial(){
    this.apiData.postData('/get-historiales',{correo: this.correo})
    .subscribe((data: any[]) => {this.lista=data
    console.log(this.lista)})
  }

}