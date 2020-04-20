export class Detalle {
    idPrestamo: any
    idEjemplares: any
    constructor(idPrestamo: any,
        idEjemplar: any){
        this.idEjemplares = idPrestamo
        this.idPrestamo = idPrestamo
    }
}