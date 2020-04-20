export class Usuarios {
    cedula: string
    primerNombre: string
    segundoNombre: string
    primerApellido: string
    segundoApellido: string
    correo: string
    clave: string
    telefonoCelular: string

    constructor(cedula:string,primerNombre:string,segundoNombre:string,primerApellido:string,segundoApellido:string
        ,correo:string,clave:string,telefonoCelular:string){
        this.cedula = cedula
        this.primerNombre = primerNombre
        this.segundoNombre = segundoNombre
        this.primerApellido = primerApellido
        this.segundoApellido = segundoApellido
        this.correo = correo
        this.clave = clave
        this.telefonoCelular = telefonoCelular
    }

    

}
