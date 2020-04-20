import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  verHeaderLector: boolean;
  verHeaderBibliotecario: boolean;

  constructor() { 
    this.verHeaderLector = true;
    this.verHeaderBibliotecario = true;
  }
}
