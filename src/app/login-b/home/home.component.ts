import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentB implements OnInit {
  lista = []
  busqueda = new FormControl('')
  filtroValor:string
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

    if(this.filtroValor !== '' && this.filtroValor !== undefined){
      this.lista = this.lista.filter(res=>{
        return res.titulo.toLocaleLowerCase().match(this.filtroValor.toLocaleLowerCase())
      })
    } else {
      return this.ngOnInit()
    }
  }
  
  verListaEjemplares(){
    this.apiData.getData('/get-ejemplares-lector').subscribe((data:any[]) => this.lista = data)
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
