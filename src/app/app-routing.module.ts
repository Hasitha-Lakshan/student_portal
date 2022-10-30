import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AuthGuard } from './security/auth.guard';
import { PreloadingService } from './core/services/preloading/preloading.service';

const routes: Routes = [
  { path: '', redirectTo: environment.entryRoute, pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadingService
    })
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
