import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { CambioClaves } from 'src/app/clases/cambio-claves';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  formCambio : any
  valorLocal: string
  constructor(private local:LocalStorageService,
              private router: Router,
              private header: HeaderService,
              private apiData : ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = true
    this.header.verHeaderLector = false
    this.comparar()
    this.formCambio ={
      claveNueva : '',
      claveRepetir : ''
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
  
  cambiarClave(){
    let nuevaClave = this.formCambio.claveNueva
    let repetirClave = this.formCambio.claveRepetir
    let mail=localStorage.getItem('ingresado')

    if(nuevaClave === repetirClave){
      console.log(nuevaClave)
      console.log(mail)

      let cambio = new CambioClaves(nuevaClave,mail)
      
      this.apiData.putData('/cambiar-clave',{tabla:'usuarios',campos:[cambio]}).subscribe(
        data =>console.log(data)
      )

    } else {
      alert('Contraseñas no son iguales')
    }
  }
}
