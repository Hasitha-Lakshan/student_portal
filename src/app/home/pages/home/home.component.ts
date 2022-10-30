import { Component, OnInit } from '@angular/core';
import { StudentData } from 'src/app/shared/models/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  studentDataFromLocalStorage: string | null = localStorage.getItem('studentData');
  studentData: StudentData = { firstName: '', lastName: '', userName: '' };

  constructor() { }

  ngOnInit(): void {
    if (this.studentDataFromLocalStorage) {
      this.studentData = JSON.parse(this.studentDataFromLocalStorage);
    }
  }

}
