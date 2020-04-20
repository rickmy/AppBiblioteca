export class Respuestas {
    idUsuario: string
    idPreguntas : number
    respuestas :string
    constructor(idUsuario: string,idPreguntas : number,
        respuestas :string){
            this.idUsuario =idUsuario,
            this.idPreguntas = idPreguntas,
            this.respuestas = respuestas

    }
}