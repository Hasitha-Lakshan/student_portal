import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private IS_STUDENT_REGISTERED: boolean = false;
  set isStudentRegistered(value: boolean) {
    this.IS_STUDENT_REGISTERED = value;
  }

  get isStudentRegistered() {
    return this.IS_STUDENT_REGISTERED;
  }

  constructor() { }
}
