import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginBRoutingModule } from './login-b-routing.module';
import { LoginBComponent } from './login-b.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    LoginBComponent
  ],
  imports: [
    CommonModule,
    LoginBRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class LoginBModule { }
