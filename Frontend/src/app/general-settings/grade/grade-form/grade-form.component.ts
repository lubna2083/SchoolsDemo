import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GradeService } from '../grade.service';
import { CityService } from '../../city/city.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonActionsService } from 'src/app/shared/services/common-actions.service';
import { Router } from '@angular/router';
import { SchoolService } from '../../school/school.service';
import { Grade } from './grade';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {

  selectedLanguage
  cityList;
  schoolList
  gradeId;
  grade: Grade = {
    gradeId: '',
    gradeNameAr: '',
    gradeNameEn: '',
    maxAllowableLimit:0,
    school:{schoolId:''}
  };
  loading: boolean = false;
  cityId
      constructor( private fb: FormBuilder,
        private schoolService: SchoolService,
        private gradeService: GradeService,
        private cityService:CityService,
        private router: Router,private translate: TranslateService,
        private commonActionsService: CommonActionsService) { }

        form: FormGroup = new FormGroup({

          gradeNameAr: new FormControl(''),
          gradeNameEn: new FormControl(''),


        });
        saveLoading = false;
        submitted = false;
        isEdit:boolean = false;
        get f(): { [key: string]: AbstractControl } {
          return this.form.controls;
        }

        ngOnInit(): void {
  this.selectedLanguage= localStorage.getItem('lang')
          let currentLink = this.router.url;
          if (currentLink.includes('update')) {
            this.isEdit = true;

            let url = currentLink.split('/');
            this.gradeId = Number(url[url.length - 1]);
            this.getGradeData(this.gradeId);
          }

          this.form = this.fb.group({
            gradeNameAr: ['', Validators.required],
            gradeNameEn: ['', Validators.required],
            maxAllowableLimit: ['', Validators.required],
          });

          this.getAllCity();
        }


        private getGradeData(id) {
          this.gradeService.getGradeData(id).subscribe(
            (response) => {

              this.grade = response;

            },
            (err) => {}
          );
        }
        private getAllCity() {
          this.cityService.getAllCities().subscribe(
            (response) => {

              this.cityList = response;

            },
            (err) => {}
          );
        }
         getSchoolList(event){
          this.schoolService.getSchoolsByCity(event).subscribe(
            (response) => {

              this.schoolList = response;

            },
            (err) => {}
          );
        }
        public addNewGrade() {
          debugger
          this.loading = true;

          this.gradeService.addNewGrade(this.grade).subscribe(
            (response) => {
              this.loading = false;
              this.commonActionsService.showSuccessToast()
              this.back();
            },
            (err) => {
              this.commonActionsService.showErrorToast()
              this.loading = false;
            }
          );
        }
    back(){
      this.router.navigate(['/grade/view']);
    }

    invalidValidation(elment){
      return this.form.get(elment)?.invalid
    }

    touchedValidation(elment){
      return this.form.get(elment)?.touched
    }

      }

