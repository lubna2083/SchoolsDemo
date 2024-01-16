import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonActionsService } from 'src/app/shared/services/common-actions.service';
import { CityService } from '../../city/city.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.scss']
})
export class SchoolFormComponent implements OnInit {
selectedLanguage
cityList;
schoolId;
    constructor( private fb: FormBuilder,
      private schoolService: SchoolService,
      private cityService:CityService,
      private router: Router,private translate: TranslateService,
      private commonActionsService: CommonActionsService) { }

      form: FormGroup = new FormGroup({

        schoolNameAr: new FormControl(''),
        schoolNameEn: new FormControl(''),


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
          this.schoolId = Number(url[url.length - 1]);
          this.getSchoolData(this.schoolId);
        }

        this.form = this.fb.group({
          schoolNameAr: ['', Validators.required],
          schoolNameEn: ['', Validators.required],

        });

        this.getAllCity();
      }

      school: any = {
        schoolId: '',
        schoolNameAr: '',
        schoolNameEn: '',
        city:{cityId:''}

      };
      loading: boolean = false;

      private getSchoolData(id) {
        this.schoolService.getSchoolData(id).subscribe(
          (response) => {

            this.school = response;

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

      public addNewSchool() {
        debugger
        this.loading = true;

        this.schoolService.addNewSchool(this.school).subscribe(
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
    this.router.navigate(['/school/view']);
  }

  invalidValidation(elment){
    return this.form.get(elment)?.invalid
  }

  touchedValidation(elment){
    return this.form.get(elment)?.touched
  }

    }
