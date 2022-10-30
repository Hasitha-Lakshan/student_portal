import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';

const JWT_Module_Options: JwtModuleOptions = {
  config: { tokenGetter: () => localStorage.getItem('jwt') }
};

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    JwtModule.forRoot(JWT_Module_Options),
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
