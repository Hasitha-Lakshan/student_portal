import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeBannerComponent } from './components/welcome-banner/welcome-banner.component';


@NgModule({
  declarations: [
    HomeComponent,
    WelcomeBannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
