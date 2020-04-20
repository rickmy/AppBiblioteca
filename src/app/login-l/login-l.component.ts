import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../clases/usuarios';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../servicio/api.service';
import { Respuestas } from '../clases/respuestas';
import { ThrowStmt } from '@angular/compiler';
import { LocalStorageService } from '../servicio/local-storage.service';
import { HeaderService } from '../servicio/header.service';
import { FormControl, Validators } from '@angular/forms';
import { CambioClaves } from '../clases/cambio-claves';
import Swal from "sweetalert2";



@Component({
  selector: 'app-login-l',
  templateUrl: './login-l.component.html',
  styleUrls: ['./login-l.component.css']
})
export class LoginLComponent implements OnInit {
  divRegistro:boolean
  divLogin:boolean
  divPreguntas:boolean
  visibilidadBtnForm: boolean
  visibilidadBtnLogin: boolean
  visibilidadBtnAtras: boolean
  usuario: Usuarios
  formLogin : any
  visibilidadPCedula: boolean
  visibilidadPCorreo: boolean
  visibilidadP: boolean
  respuestaUno : Respuestas
  respuestaDos :Respuestas
  respuestaTres: Respuestas
  respuestaCuatro: Respuestas
  respuestaCinco: Respuestas
  divOlvidoClave : boolean
  divPreguntasO : boolean
  divCambiarClave : boolean
  primerIntento: Boolean
  segundoIntento : boolean
  correo = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  respuestaUnoO : string
  respuestaDosO : string
  respuestaTresO: string
  respuestaCuatroO : string
  respuestaCincoO : string
  claveNueva : string
  claveRepetir : string
  listaPreguntas = []
  correoVerificado : any
  
  
  constructor(  private apiData: ApiService, 
                private router :Router, 
                private local: LocalStorageService,
                private header: HeaderService) {}



  ngOnInit() {
    this.header.verHeaderBibliotecario = true
    this.header.verHeaderLector = true
    this.divLogin = true;
    this.divRegistro = false;
    this.divPreguntas = false;
    this.divPreguntasO = false
    this.visibilidadBtnLogin = false
    this.visibilidadBtnForm = true
    this.visibilidadBtnAtras = true
    this.visibilidadPCedula = false
    this.visibilidadPCorreo = false
    this.visibilidadP = false

    
    this.divLogin = true
    this.divOlvidoClave = false
    this.divPreguntas = false
    this.divCambiarClave = false

    this.primerIntento = true
    this.segundoIntento = false

    this.usuario = {
    cedula:'',
    primerNombre : '',
    segundoNombre : '',
    primerApellido : '',
    segundoApellido : '',
    correo :'',
    clave:'',
    telefonoCelular:''
    }
    this.formLogin = {
      correo :'',
      clave:''
    }

    this.respuestaUno ={
      idUsuario:'',
      idPreguntas:0,
      respuestas :''
      
    }
    this.respuestaDos ={
      idUsuario:'',
      idPreguntas:0,
      respuestas :''
      
    }
    this.respuestaTres ={
      idUsuario:'',
      idPreguntas:0,
      respuestas :''
      
    }
    this.respuestaCuatro ={
      idUsuario:'',
      idPreguntas:0,
      respuestas :''
      
    }
    this.respuestaCinco ={
      idUsuario:'',
      idPreguntas:0,
      respuestas :''
      
    }
    this.verListaPreguntas()
  }


  validacion( dato ) {
    
    if(dato.length >= 3 || dato.length <= 20){
      console.log(dato)
      var mayuscula = dato[0].toUpperCase()
      var comprobado  = 0
      var otrocomprobado = 0
      if(dato[0] === mayuscula ){
      for(let i=0; i < dato.length; i++){      
                 
        console.log(mayuscula)
        console.log(dato[0])       
          console.log('exito')
          if (dato[i] == 'a' || dato[i] == 'e' || dato[i] == 'i' || dato[i] == 'o' || dato[i] == 'u'){
            comprobado += 1            
          }else{
            otrocomprobado += 1
          }        
        }
        if(comprobado === 0 || otrocomprobado === 0){
          return false
        }
        else{
          return true
        }
      }else{
        return false
      }
    }
    else{
      return false
    }
  }
  mostrarRegistro(){
    this.divRegistro = true
    this.divLogin = false
    this.visibilidadBtnForm = false
    this.visibilidadBtnLogin = true
    this.divPreguntas = false
  }
  
  mostrarLogin(){
    this.divLogin = true
    this.divRegistro = false
    this.visibilidadBtnForm = true
    this.visibilidadBtnLogin = false
    this.divPreguntas = false
  }

  atrasPag(){
    return this.ngOnInit()
  }

  pasarPag(){
    if (this.ValidarCampos() === true) {
      var usuario = new Usuarios(this.usuario.cedula,this.usuario.primerNombre,this.usuario.segundoNombre,this.usuario.primerApellido,this.usuario.segundoApellido,
        this.usuario.correo,this.usuario.clave,this.usuario.telefonoCelular)
        console.log(usuario);
        this.apiData.postData('/ingresarLector',{campos:usuario}).subscribe(data=>console.log(data))

        this.verPreguntas();       
        this.divRegistro = true
        this.divLogin = true
        this.divPreguntas = false
        this.visibilidadBtnForm = false
        this.visibilidadBtnLogin = false
    } else {
      Swal.fire({
        title:'Alerta',
        text:'Ingrese los datos solicitados',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      })
    }
    
  }

  limpiarCampos(){
    this.usuario.cedula="";
    this.usuario.primerNombre="";
    this.usuario.segundoNombre="";
    this.usuario.primerApellido="";
    this.usuario.segundoApellido="";                                        
    this.usuario.correo="";
    this.usuario.clave="";
    this.usuario.telefonoCelular ="" 
  }

  validarCedula(cedula: string) {
    if (cedula.length === 10) {
  
      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);
  
      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {
  
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
  
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));
  
        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }
  
        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }
  
        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }
  
        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }
  
        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }
  
        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;
  
        // Suma total
        const sumaTotal = (pares + impares);
  
        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);
  
        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;
  
        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;
  
        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }
  
        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }
  
      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  
  }
  
  validarEmail( email ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  ValidarCampos(){
    var correo = this.usuario.correo
    var cedula = this.usuario.cedula
    if( this.validarCedula(cedula) === true ){
      this.visibilidadPCedula = false
      if(this.usuario.primerNombre === "" || this.validacion(this.usuario.primerNombre) === false){
        console.log('pn')
      }else{
        if(this.usuario.segundoNombre === "" || this.validacion(this.usuario.segundoNombre) === false){
          console.log('sn')
        }else{
          if(this.usuario.primerApellido === "" || this.validacion(this.usuario.primerApellido) === false){
            console.log('pa')
          }else{
            if(this.usuario.segundoApellido === "" || this.validacion(this.usuario.segundoApellido) === false){
              console.log('sa')
            }else{ 
            if(this.validarEmail(correo) === true){
              this.visibilidadPCorreo = false
              if(this.usuario.clave === "" || this.usuario.clave.length < 8){
                console.log('clave')
              }else{
                this.usuario.telefonoCelular = '0' + this.usuario.telefonoCelular.toString()
                if (this.usuario.telefonoCelular === "" || this.usuario.telefonoCelular.length != 10) {
                  console.log('tlefnoe')
                } else {
                    return true
                }
              }
            }else{
              this.visibilidadPCorreo =true
            }
            }
          }
        }
      }
    }else{
      this.visibilidadPCedula = true
    }    
  }


  registrar(){
    var user = this.usuario.correo
    var respuestaUno = this.respuestaUno.respuestas
    var respuestaDos = this.respuestaDos.respuestas
    var respuestaTres = this.respuestaTres.respuestas
    var respuestaCuatro = this.respuestaCuatro.respuestas
    var respuestaCinco = this.respuestaCinco.respuestas

    if(this.validarInputs(respuestaUno)=== true && this.validarInputs(respuestaDos) === true&&
        this.validarInputs(respuestaTres)=== true && this.validarInputs(respuestaCuatro)=== true && this.validarInputs(respuestaCinco)=== true){
          var primeraRespuesta = new Respuestas(user,1,respuestaUno)
          var segundaRespuesta = new Respuestas(user,2,respuestaDos)
          var terceraRespuesta = new Respuestas(user,3,respuestaTres)
          var cuartaRespuesta = new Respuestas(user,4,respuestaCuatro)
          var quintaRespuesta = new Respuestas(user,5,respuestaCinco)
            this.apiData.postData('/postRespuesta',{'campos':primeraRespuesta}).subscribe(data=>console.log(data))
            this.apiData.postData('/postRespuesta',{'campos':segundaRespuesta}).subscribe(data=>console.log(data))
            this.apiData.postData('/postRespuesta',{'campos':terceraRespuesta}).subscribe(data=>console.log(data))
            this.apiData.postData('/postRespuesta',{'campos':cuartaRespuesta}).subscribe(data=>console.log(data))
            this.apiData.postData('/postRespuesta',{'campos':quintaRespuesta}).subscribe(data=>console.log(data))
            alert('Usuario registrado correctamente')
            this.router.navigate(['lector'])
        
    }else{
      alert('ingrese los datos solicitados')
    }
   
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
        this.apiData.verLogin('/loginLector',{'correo':correo,'clave':clave}).subscribe(
          data => {
            console.log(data)
            if(data === false){
              Swal.fire({
        title:'Alerta',
        text:'Correo y/o contraseña incorrecta',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      })
            }else{
              alert('bienvenido')
              this.local.local('user',1)
              this.local.local('ingresado', correo)
              this.formLogin.correo = ""
              this.formLogin.clave =""
      
              this.navegation();
            }
          },
          (error: HttpErrorResponse) => Swal.fire({
        title:'Alerta',
        text:'Correo y/o contraseña incorrecta',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      }) ,
          ()=> console.log('peticion Finalizada')
        )
      }else{
      Swal.fire({
        title:'Alerta',
        text:'Correo y/o contraseña incorrecta',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      })
      }
    }else{
    Swal.fire({
        title:'Alerta',
        text:'Correo y/o contraseña incorrecta',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      })
    }
        
      
    
  }


  navegation(){
    this.router.navigate(['lector','homeL'])
  }

  verPreguntas(){
    this.apiData.postData('/get-activos',{campos:'preguntaSeguridad',tabla:'preguntasSeguridad'}).subscribe((data:any[])=>this.listaPreguntas=data);
    
  }

  
  olvidoClave(){
    this.visibilidadBtnForm = false
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
            this.divPreguntasO = true
            this.correoVerificado = mail
            console.log(this.correoVerificado)
        },
        (error: HttpErrorResponse) =>  alert('correo no esta esta registrado') ,
      )
  }

  atrasPagina(){
    return this.ngOnInit()
  }
  
  recuperarUno(){
    let idUno = 1
    let resUno = this.respuestaUnoO
    let idTres = 3
    let resTres = this.respuestaTresO
    let idCinco = 5
    let resCinco = this.respuestaCincoO
    let correo = this.correoVerificado

    if(this.validarInputs(resTres)===true && this.validarInputs(resUno) === true && this.validarInputs(resCinco)){
      this.apiData.postData('/recuperacion-uno',{campos:{correo:correo,idPreguntaUno:idUno,
        respuestaUno:resUno,idPreguntaTres:idTres,respuestaTres:resTres,idPreguntaCinco:idCinco,respuestaCinco:resCinco}})
        .subscribe(data => {this.divCambiarClave = true, this.divPreguntasO = false, this.divLogin=false},
        (error: HttpErrorResponse) =>  {alert('Las respuestas no son correctas'), this.segundoIntento = true, this.primerIntento = false})
    }else{
      alert('ingrese los campos solicitados')
    }
  }

  recuperarDos(){
    let idUno = 1
    let resUno = this.respuestaUnoO
    let idDos = 2
    let resDos = this.respuestaDosO
    let idCuatro = 4
    let resCuatro = this.respuestaCuatroO
    let correo = this.correoVerificado

    

    if(this.validarInputs(resUno) === true && this.validarInputs(resDos) && this.validarInputs(resCuatro)){
      this.apiData.postData('/recuperacion-dos',{campos:{correo:correo,idPreguntaUno:idUno,
        respuestaUno:resUno,idPreguntaDos:idDos,respuestaDos:resDos,idPreguntaCuatro:idCuatro,respuestaCuatro:resCuatro}})
        .subscribe(data => {this.divCambiarClave = true, this.divPreguntasO = false, this.divLogin=false},
          (error: HttpErrorResponse) =>  {Swal.fire({
            title:'Alerta',
            text:'Las respuestas no son correctas. Dirigete a la Institucion para la recuperación de tu contraseña',
            icon:'info',
            confirmButtonText:'OK',
            confirmButtonColor:'blue'
          }).then(res =>{
            return true
          }), this.segundoIntento = false, this.primerIntento = false, this.divLogin = true, this.divPreguntasO = false})
    }else{
      Swal.fire({
        title:'Alerta',
        text:'Ingrese los datos solicitados',
        icon:'info',
        confirmButtonText:'OK',
        confirmButtonColor:'blue'
      }).then(res =>{
        return true
      })
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