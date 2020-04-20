import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../servicio/local-storage.service';
import { Router } from '@angular/router';
import {  HeaderService } from '../servicio/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private local: LocalStorageService,
              private router : Router,
              public header: HeaderService
              ) { }

  ngOnInit() {
    console.log(this.header.verHeaderLector)
    console.log(this.header.verHeaderBibliotecario)
  }

  salirBibliotecario(){
    this.local.limpiar()
    this.router.navigate(['bibliotecario'])
  }
  salirLector(){
    this.local.limpiar()
    this.router.navigate(['lector'])
  }

}
