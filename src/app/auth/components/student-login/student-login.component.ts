import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StudentLoginRequest } from 'src/app/shared/models/student';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthStateService } from 'src/app/shared/services/states/auth-state.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  studentLoginForm: FormGroup = new FormGroup({});
  isStudentRegistered: boolean = false;
  isError: boolean = false;

  get formControls() {
    return this.studentLoginForm.controls;
  }

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.isStudentRegistered = this.authStateService.isStudentRegistered;

    this.studentLoginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  checkAuthStatus() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  submitLoginData() {
    if (this.studentLoginForm.valid && this.studentLoginForm.value) {
      const request: StudentLoginRequest = {
        username: this.studentLoginForm.get('username')?.value.toUpperCase(),
        password: this.studentLoginForm.get('password')?.value
      };
      this.login(request);
    }
  }

  login(request: StudentLoginRequest) {
    this.authService.connectStudentLoginApi(request).subscribe(
      response => {
        if (response && response.status) {
          this.isError = false;
          this.authenticationService.setLoginStatus(true);
          this.router.navigate(['home']);
        } else {
          this.isError = true;
        }
      },
      error => {
        this.isError = true;
        console.error(error);
      }
    );
  }
}
