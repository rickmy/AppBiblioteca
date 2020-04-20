import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/servicio/local-storage.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/servicio/header.service';
import { ApiService } from 'src/app/servicio/api.service';
import { Respuestas } from 'src/app/clases/respuestas';
import { Usuarios } from 'src/app/clases/usuarios';

@Component({
  selector: 'app-agregar-bibliotecario',
  templateUrl: './agregar-bibliotecario.component.html',
  styleUrls: ['./agregar-bibliotecario.component.css']
})
export class AgregarBibliotecarioComponent implements OnInit {
  listPreguntas : any
  respuestaUno : Respuestas
  respuestaDos :Respuestas
  respuestaTres: Respuestas
  respuestaCuatro: Respuestas
  respuestaCinco: Respuestas
  usuario: Usuarios

  valorLocal: string
  constructor(private local:LocalStorageService, 
              private router: Router,
              private header: HeaderService,
              private apiData: ApiService) { }

  ngOnInit() {
    this.header.verHeaderBibliotecario = false
    this.header.verHeaderLector = true
    this.comparar()
    this.verPreguntas()
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

  }

  comparar(){
    this.valorLocal=localStorage.getItem('user')
    if(this.valorLocal !== '' || this.valorLocal !== undefined){
      return true
    } else {
      this.router.navigate(['bibliotecario'])
    }
  }
  
  verPreguntas(){
    this.apiData.postData('/get-activos',{campos:'preguntaSeguridad',tabla:'preguntasSeguridad'}).subscribe(data=>this.listPreguntas=data);
    
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
      //this.visibilidadPCedula = false
      if(this.usuario.primerNombre === "" || this.usuario.primerNombre.length < 3){
        console.log('pn')
      }else{
        if(this.usuario.segundoNombre === "" || this.usuario.segundoNombre.length < 3){
          console.log('sn')
        }else{
          if(this.usuario.primerApellido === "" || this.usuario.primerApellido.length < 4){
            console.log('pa')
          }else{
            if(this.usuario.segundoApellido === "" || this.usuario.segundoApellido.length < 4){
              console.log('sa')
            }else{ 
            if(this.validarEmail(correo) === true){
              //this.visibilidadPCorreo = false
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
              //this.visibilidadPCorreo =true
            }
            }
          }
        }
      }
    }else{
      //this.visibilidadPCedula = true
    }    
  }
  pasarPag(){
    if (this.ValidarCampos() === true) {
      var usuario = new Usuarios(this.usuario.cedula,this.usuario.primerNombre,this.usuario.segundoNombre,this.usuario.primerApellido,this.usuario.segundoApellido,
        this.usuario.correo,this.usuario.clave,this.usuario.telefonoCelular)
        console.log(usuario);
        this.apiData.postData('/ingresarBibliotecario',{campos:usuario}).subscribe(data=>console.log(data + 'ya vañio'))
        
        
    } else {
      console.log('vuelva a intentar')
      alert('Ingrese los Datos Solicitados')
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
            alert('Bibliotecario Ingresado Correctamente')
        
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
}
