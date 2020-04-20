import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  

  local(key : string,valor : any){
    return localStorage.setItem(key,valor) 
  }

  limpiar(){
    return localStorage.clear()
  }

  comparar(key: string){
    return localStorage.getItem(key)
  }
}
