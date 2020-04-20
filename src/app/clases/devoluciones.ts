export class Devoluciones{
    codigo:string
    idPrestamos:any
    fechaDevolucion:Date
    idBibliotecario:any
    observaciones:string
   constructor(codigo:string,idPrestamos:any,fechaDevolucion:Date,
    idBibliotecario:any,observaciones:string){
        this.codigo=codigo
        this.idPrestamos=idPrestamos
        this.fechaDevolucion=fechaDevolucion
        this.idBibliotecario=idBibliotecario
        this.observaciones=observaciones
    } 
}