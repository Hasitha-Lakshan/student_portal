import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StudentRegisterRequest } from 'src/app/shared/models/student';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AuthStateService } from 'src/app/shared/services/states/auth-state.service';
import { MustMatch } from 'src/app/shared/validators/must-match';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  studentRegistrationForm: FormGroup = new FormGroup({});
  isError: boolean = false;

  get formControls() {
    return this.studentRegistrationForm.controls;
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

    this.studentRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]*$')]],
      indexNumber: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('[a-zA-Z]{1}[0-9]{2}[0-9]{3}[0-9]*$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[0-9])([a-zA-Z0-9*.!@#$%^&(){}|]).{7,7}$')]],
      confirmPassword: ['', Validators.required]
    }, { validators: [MustMatch('password', 'confirmPassword')] } as AbstractControlOptions);
  }

  checkAuthStatus() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  submitStudentData() {
    if (this.studentRegistrationForm.valid && this.studentRegistrationForm.value) {
      const request: StudentRegisterRequest = {
        firstName: this.studentRegistrationForm.get('firstName')?.value,
        lastName: this.studentRegistrationForm.get('lastName')?.value,
        username: this.studentRegistrationForm.get('indexNumber')?.value.toUpperCase(),
        password: this.studentRegistrationForm.get('password')?.value
      };
      this.registerStudent(request);
    }
  }

  registerStudent(request: StudentRegisterRequest) {
    this.authService.connectStudentRegisterApi(request).subscribe(
      response => {
        if (response.status) {
          this.isError = false;
          this.authStateService.isStudentRegistered = true;
          this.router.navigate(['auth/login']);
        } else {
          this.isError = true;
          console.error(response.error);
        }
      },
      error => {
        this.isError = true;
      }
    );
  }

}
