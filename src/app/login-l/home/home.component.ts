import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import { ApiService } from 'src/app/servicio/api.service';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  busqueda = new FormControl('')
  lista = []
  filtroValor:string
  valorLocal: string

  constructor(private apiData:ApiService,
              private local: LocalStorageService, 
              private router:Router,
              private header : HeaderService) { 

  }

  ngOnInit() {
    this.header.verHeaderBibliotecario = true
    this.header.verHeaderLector = false

    this.busqueda.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor => this.busquedaIngresada(valor));
    
    this.comparar()
    this.verListaEjemplares()
  }
  

  busquedaIngresada(valor:string){
    this.filtroValor = valor
  }
  
  verListaEjemplares(){
    this.apiData.getData('/get-ejemplares-lector').subscribe((data:any[]) => this.lista = data)
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
  

}
