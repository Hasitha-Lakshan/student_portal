import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    let isExpired: boolean = true;

    if (jwt) {
      isExpired = this.jwtHelper.isTokenExpired(jwt);
    }
    return !isExpired;
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('studentData');
  }
  
}
