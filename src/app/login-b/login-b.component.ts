import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../servicio/api.service';
import { LocalStorageService } from '../servicio/local-storage.service';
import { HeaderService } from '../servicio/header.service';
import { FormControl, Validators } from '@angular/forms';
import { CambioClaves } from '../clases/cambio-claves';

@Component({
  selector: 'app-login-b',
  templateUrl: './login-b.component.html',
  styleUrls: ['./login-b.component.css']
})
export class LoginBComponent implements OnInit {
  
  formLogin : any
  divOlvidoClave : boolean
  divLogin: boolean
  divPreguntas : boolean
  divCambiarClave : boolean
  primerIntento: Boolean
  segundoIntento : boolean
  correo = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  respuestaUno : string
  respuestaDos : string
  respuestaTres: string
  respuestaCuatro : string
  respuestaCinco : string
  claveNueva : string
  claveRepetir : string
  listaPreguntas = []
  correoVerificado : any

  constructor(private apiData: ApiService,
              private router: Router,
              private local: LocalStorageService,
              private header : HeaderService
              ) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = true
    this.header.verHeaderLector = true
    
    this.divLogin = true
    this.divOlvidoClave = false
    this.divPreguntas = false
    this.divCambiarClave = false

    this.primerIntento = true
    this.segundoIntento = false
    
    this.formLogin = {
      correo :'',
      clave:''
    }

    this.verListaPreguntas()

  }
  
  olvidoClave(){
    this.divLogin = false
    this.divOlvidoClave = true
  }

  verListaPreguntas(){
    this.apiData.postData('/get-general',{campos:'preguntaSeguridad',tabla:'preguntasSeguridad'}).subscribe((data:any[])=>this.listaPreguntas=data);
  }

  verificar(){
    let mail = this.correo.value
    console.log(mail)
    
      this.apiData.postData('/verificar-correo',{'correo':mail}).subscribe(
        data =>  {
        console.log(data)
            this.divOlvidoClave = false
            this.divPreguntas = true
            this.correoVerificado = mail
            console.log(this.correoVerificado)
        },
        (error: HttpErrorResponse) =>  alert('correo no esta esta registrado') ,
      )
  }

  atrasPag(){
    return this.ngOnInit()
  }

  validarEmail( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }
  

  validarInputs(campo){
    if(campo !== ""){
      return true
    }else{
      return false
    }
  }

  ingresar(){
    var correo = this.formLogin.correo
    var clave = this.formLogin.clave
    
    if(this.validarEmail(correo)=== true){
      if(clave !== ''){
        this.apiData.verLogin('/loginBibliotecario',{'correo':correo,'clave':clave}).subscribe(
          data => {
            console.log(data)
            if(data == false){
              alert('usuario y/o contraseña incorrectas');
            }else{
              alert('bienvenido')
              this.local.local('user',1)
              this.local.local('ingresado', correo)
              this.formLogin.correo = ""
              this.formLogin.clave =""
              this.router.navigate(['bibliotecario','homeB'])
              
              
            }
          },
          (error: HttpErrorResponse) =>  alert('usuario y/o contraseña incorrectas') ,
          ()=> console.log('peticion Finalizada')
        )
      }else{
        alert('usuario y/o contraseña incorrectas')
      }
    }else{
      alert('usuario y/o contraseña incorrectas')
    }
        
      
    
  
  }

  recuperarUno(){
    let idUno = 1
    let resUno = this.respuestaUno
    let idTres = 3
    let resTres = this.respuestaTres
    let idCinco = 5
    let resCinco = this.respuestaCinco
    let correo = this.correoVerificado

    if(this.validarInputs(resTres)===true && this.validarInputs(resUno) === true && this.validarInputs(resCinco)){
      this.apiData.postData('/recuperacion-uno',{campos:{correo:correo,idPreguntaUno:idUno,
        respuestaUno:resUno,idPreguntaTres:idTres,respuestaTres:resTres,idPreguntaCinco:idCinco,respuestaCinco:resCinco}})
        .subscribe(data => {this.divCambiarClave = true, this.divPreguntas = false, this.divLogin=false},
        (error: HttpErrorResponse) =>  {alert('Las respuestas no son correctas'), this.segundoIntento = true, this.primerIntento = false})
    }else{
      alert('ingrese los campos solicitados')
    }
  }

  recuperarDos(){
    let idUno = 1
    let resUno = this.respuestaUno
    let idDos = 2
    let resDos = this.respuestaDos
    let idCuatro = 4
    let resCuatro = this.respuestaCuatro
    let correo = this.correoVerificado

    if(this.validarInputs(resUno) === true && this.validarInputs(resDos) && this.validarInputs(resCuatro)){
      this.apiData.postData('/recuperacion-dos',{campos:{correo:correo,idPreguntaUno:idUno,
        respuestaUno:resUno,idPreguntaDos:idDos,respuestaDos:resDos,idPreguntaCuatro:idCuatro,respuestaCuatro:resCuatro}})
        .subscribe(data => {this.divCambiarClave = true, this.divPreguntas = false, this.divLogin=false},
          (error: HttpErrorResponse) =>  {alert('Las respuestas no son correctas. Dirigete a la Institucion para la recuperación de tu contraseña'), this.segundoIntento = false, this.primerIntento = false, this.divLogin = true, this.divPreguntas = false})
    }else{
      alert('ingrese los campos solicitados')
    }
  }

  cambiarClave(){
    let nuevaClave = this.claveNueva
    let repetirClave = this.claveRepetir
    let mail=this.correoVerificado

    if(this.validarInputs(nuevaClave)==true && this.validarInputs(repetirClave)===true){
      if(nuevaClave === repetirClave){
        console.log(nuevaClave)
        console.log(mail)
  
        let cambio = new CambioClaves(nuevaClave,mail)
        
        this.apiData.putData('/cambiar-clave',{tabla:'usuarios',campos:[cambio]})
        .subscribe(data => {return this.ngOnInit()},
          (error: HttpErrorResponse) =>  {alert('Las respuestas no son correctas'), this.segundoIntento = true, this.primerIntento = false})
      
  
      } else {
        alert('Contraseñas no son iguales')
      }
    }else {
      alert('Contraseñas no son iguales')
    }
  }
}
