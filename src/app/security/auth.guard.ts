import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isTokenExpired()) {
      this.router.navigate(['auth']);
      return false;
    } else {
      return true;
    }
  }

  isTokenExpired(): boolean {
    const jwt = localStorage.getItem('jwt');
    let isExpired: boolean = true;

    if (jwt) {
      isExpired = this.jwtHelper.isTokenExpired(jwt);
    }
    return isExpired;
  }
}
