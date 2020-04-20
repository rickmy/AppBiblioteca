import { Component, OnInit } from '@angular/core';
import { Stands } from 'src/app/clases/stands';
import { ApiService } from 'src/app/servicio/api.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';

@Component({
  selector: 'app-agregar-stand',
  templateUrl: './agregar-stand.component.html',
  styleUrls: ['./agregar-stand.component.css']
})
export class AgregarStandComponent implements OnInit {

  stand: Stands
  valorLocal: string

  constructor(private apiData : ApiService,
              private router : Router,
              private header : HeaderService,
              private local:LocalStorageService
              ) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true

    this.comparar()

    this.stand={
      stand:''
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

  ingresarStand(){
    let nombreStand = this.stand.stand

    let stand = new Stands(nombreStand)

    this.apiData.postData('/ingresar-datos',{campos:stand,tabla:'stand'}).subscribe(data=>console.log(data))
    this.router.navigate(['bibliotecario','homeB','inventario'])
  }
}
