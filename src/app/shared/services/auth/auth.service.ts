import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiEndpoint } from '../../apis/api-end-points';
import { StudentLoginRequest, StudentLoginResponse, StudentRegisterRequest, StudentRegisterResponse } from '../../models/student';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = apiEndpoint;
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/Json' }) };

  constructor(
    private http: HttpClient,
  ) { }

  connectStudentRegisterApi(request: StudentRegisterRequest): Observable<StudentRegisterResponse> {
    return this.http.post<StudentRegisterResponse>(this.baseUrl.studentRegister, request, this.httpOptions);
  }

  connectStudentLoginApi(request: StudentLoginRequest): Observable<StudentLoginResponse> {
    return this.http.post<StudentLoginResponse>(this.baseUrl.studentLogin, request, this.httpOptions).pipe(map(response => {
      if (response && response.status) {
        localStorage.setItem('jwt', response.authenticationtoken);
        localStorage.setItem('studentData', JSON.stringify(response.studentData));
      }
      return response;
    }));
  }

}
