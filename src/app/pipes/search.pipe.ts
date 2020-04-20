import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista: any[], txt:string,id:number): any[] {

    if( txt !=='' && txt == undefined ){
      return lista
    }else{
      return lista.filter(texto => texto.titulo.toUpperCase().includes(txt.toUpperCase()))
    }


  
  }

  

}



