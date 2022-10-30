import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { StudentAuthComponent } from './pages/student-auth/student-auth.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentRegisterComponent } from './components/student-register/student-register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentAuthComponent,
    StudentLoginComponent,
    StudentRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentAuthComponent
  ]
})
export class AuthModule { }
