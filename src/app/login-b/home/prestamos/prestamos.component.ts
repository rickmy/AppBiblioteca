import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  valorLocal: string
  lista : any
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header : HeaderService,
              private apiData: ApiService ){ 
              
              }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.getPrestamos()
  }
  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal == '' || this.valorLocal == undefined){
      this.router.navigate(['bibliotecario'])
      
    } else {
      return true
    }
  }
  agregarPrestamo(){
    this.router.navigate(['bibliotecario','homeB','prestamos','agregarPrestamo'])
  }
  getPrestamos(){
    this.apiData.getData('/get-prestamos').subscribe(data => {this.lista = data
    let array = this.lista.resultado
    let array2 = this.lista.respuesta
    console.log(array2)
    console.log(array)
    console.log(array.length)})
   
  }

  /*generarTabla(){
    this.apiData.getData('/get-prestamos').subscribe(data => {this.lista = data
      let array = this.lista.resultado
      let array2 = this.lista.respuesta
         
      for(let i=0; i<array.length; i++){
        let tr = document.createElement('tr')
        let codigo = document.createElement('td')
        let fechaPrestamo = document.createElement('td')
        let nombreB = document.createElement('td')
        let fechaMax = document.createElement('td')
        let nombreL = document.createElement('td')
        let observaciones = document.createElement('td')
        codigo.appendChild(document.createTextNode(array[i].codigo));
        fechaPrestamo.appendChild(document.createTextNode(array[i].fechaPrestamo));
        nombreB.appendChild(document.createTextNode(array[i].primerNombre));
        fechaMax.appendChild(document.createTextNode(array[i].fechaMaxEntrega));
        nombreL.appendChild(document.createTextNode(array2[i].primerNombre));
        observaciones.appendChild(document.createTextNode(array[i].observaciones));
        tr.appendChild(codigo);
        tr.appendChild(fechaPrestamo);
        tr.appendChild(nombreB);
        tr.appendChild(fechaMax);
        tr.appendChild(nombreL);
        tr.appendChild(observaciones);
      }})
    
  }*/
}
