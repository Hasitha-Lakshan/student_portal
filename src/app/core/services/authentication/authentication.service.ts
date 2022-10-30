import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginStatus = new BehaviorSubject<boolean>(false);

  setLoginStatus(flag: boolean) {
    this.loginStatus.next(flag);
  }

  getLoginStatus() {
    return this.loginStatus.asObservable();
  }

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem('jwt');
    let isExpired: boolean = true;

    if (jwt) {
      isExpired = this.jwtHelper.isTokenExpired(jwt);
    }
    this.setLoginStatus(!isExpired);
    return !isExpired;
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('studentData');
    this.setLoginStatus(false);
  }

}
