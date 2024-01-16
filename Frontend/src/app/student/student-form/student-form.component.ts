import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CityService } from 'src/app/general-settings/city/city.service';
import { GradeService } from 'src/app/general-settings/grade/grade.service';
import { SchoolService } from 'src/app/general-settings/school/school.service';
import { CommonActionsService } from 'src/app/shared/services/common-actions.service';
import { StudentService } from '../student.service';
import { FactoryOrValue } from 'rxjs';
import { Student } from './student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  loading: boolean = false;
  cityList;
  schoolList;
  gradeList;
  maxAllowableLimit;
  grade;
  capacity;
  student!:Student;
  studentId;
  schoolId;

  students = [
    {
      studentId: '',
      studentNameAr: '',
      studentNameEn: '',
      address: '',
      grade: { gradeId: '' },
    },
  ];
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private schoolService: SchoolService,
    private gradeService: GradeService,
    private cityService: CityService,
    private router: Router,
    private translate: TranslateService,
    private commonActionsService: CommonActionsService
  ) {}

  form: FormGroup = new FormGroup({
    gradeId: new FormControl(''),
  });
  saveLoading = false;
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initFrorm()
    // Retrive city List
    this.getAllCity();
  }

// Generate rows based on grade capcity
  getRows() {
    this.deleteAllStudents()
    this.getCapacity(this.grade.gradeId);
    var rowsCount = this.grade.maxAllowableLimit;
    for (let i = 0; i < rowsCount; i++) {
      this.addRow();
    }
  }

  // Add new List of Students
  public addNewStudent() {
    if (this.checkIfAllTableFieldsAreFill()|| this.form.invalid) {
      return;
    }
    this.loading = true;
    this.studentService.addNewStudentList(this.students).subscribe(
      (response) => {
        this.loading = false;
        this.commonActionsService.showSuccessToast();
        this.back();
      },
      (err) => {
        this.commonActionsService.showErrorToast();
        this.loading = false;
      }
    );
  }
  // Go back to student page
  back() {
    this.router.navigate(['/student/view']);
  }
//Validate element on submit
  invalidValidation(elment) {
    return this.form.get(elment)?.invalid;
  }
//Validate element on touch
  touchedValidation(elment) {
    return this.form.get(elment)?.touched;
  }
  // add one row function
  addRow() {
    this.students.push({
      studentId: '',
      studentNameAr: '',
      studentNameEn: '',
      address: '',
      grade: { gradeId: this.grade.gradeId },
    });
  }
// Clear student List
  deleteAllStudents() {
    this.students.splice(0, this.students.length);
  }
  // Validate all student data is filled
  private checkIfAllTableFieldsAreFill(): boolean {
    for (let i = 0; i < this.students.length; i++) {
      let row = this.students[i];
      if (
        row.studentNameAr === '' ||
        row.studentNameEn === '' ||
        row.address === ''
      ) {
        this.commonActionsService.showfillErrorToast();
        return true;
      }
    }
    return false;
  }
  //Initilize form
  initFrorm(){
    this.form = this.fb.group({
      gradeId: ['', Validators.required],
    });
  }
  //Get City List
  private getAllCity() {
    this.cityService.getAllCities().subscribe(
      (response) => {
        this.cityList = response;
      },
      (err) => {}
    );
  }
////////////////Get list and data from Server////////////////////
    //Get School List
    getSchoolList(event) {
      this.schoolService.getSchoolsByCity(event).subscribe(
        (response) => {
          this.schoolList = response;
        },
        (err) => {}
      );
    }

      //Get grade List
      getGradeList(event) {
        this.gradeService.getGradsBySchool(event).subscribe(
          (response) => {
            this.gradeList = response;
          },
          (err) => {}
        );
      }
//Get Grade Remaining Capacity
getCapacity(gradeId) {
  this.gradeService.getRemainingCapacity(gradeId).subscribe(
    (response) => {

      this.capacity = response;
      this.grade.maxAllowableLimit = this.capacity;
    },
    (err) => {}
  );
}

}
