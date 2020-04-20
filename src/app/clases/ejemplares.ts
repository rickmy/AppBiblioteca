import { DatePipe } from '@angular/common'

export class Ejemplares {
    codigo: string
    idTextos : number
    fechaPublicacion : number
    idStand : number
    idEstadoConservaciones : number
    idDisponibilidad : number
    constructor(codigo: string,
        idTextos : number,
        fechaPublicacion : number,
        idStand : number,
        idEstadoConservaciones : number,
        idDisponibilidad : number)
        {
            this.codigo = codigo
            this.idTextos = idTextos
            this.fechaPublicacion = fechaPublicacion
            this.idStand = idStand
            this.idEstadoConservaciones = idEstadoConservaciones
            this.idDisponibilidad = idDisponibilidad
        }
}
