import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActionCode, Actions } from 'src/app/shared/actions_enums';
import { ActionsWithCode } from 'src/app/shared/actions_with_code';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  constructor( private studentService: StudentService,
    ) { }
  ngOnInit(): void {
  }
  getAllStudents = (page: number | null = 0) => {
    return this.studentService.getAllStudentsByPage(page!);
  };
  displayedColumns: string[] = ['studentId','studentNameAr','studentNameEn',
  'address','schoolNameAr','gradeNameAr'];



}
