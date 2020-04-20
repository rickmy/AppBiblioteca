export class Prestamos{
    codigo: string
    fechaPrestamo: Date
    idLectores: any
    fechaMaxEntrega: Date
    idBibliotecario: any
    observaciones: string
    constructor(codigo: string, fechaPrestamo: Date,idLectores: any,
        fechaMaxEntrega: Date,
        idBibliotecario: any,
        observaciones: string){
            this.codigo = codigo
            this.fechaPrestamo = fechaPrestamo
            this.idLectores = idLectores
            this.fechaMaxEntrega = fechaMaxEntrega
            this.idBibliotecario = idBibliotecario
            this.observaciones = observaciones
        }
}