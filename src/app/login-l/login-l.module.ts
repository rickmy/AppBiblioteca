import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginLRoutingModule } from './login-l-routing.module';
import { LoginLComponent } from './login-l.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [LoginLComponent],
  imports: [
    CommonModule,
    LoginLRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class LoginLModule { }
