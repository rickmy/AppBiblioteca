export class Textos {
    codigo: string
    titulo: string
    idEditoriales : number
    idTipoTextos: number
    descripcion: string
    constructor(
        codigo: string,
        titulo: string,
        idEditoriales : number,
        idTipoTextos: number,
        descripcion: string
        )
        {
            this.codigo = codigo
            this.titulo = titulo
            this.idEditoriales = idEditoriales
            this.idTipoTextos = idTipoTextos
            this.descripcion = descripcion 
    }
}
