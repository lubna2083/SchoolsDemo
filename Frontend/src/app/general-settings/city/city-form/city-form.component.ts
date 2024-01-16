import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonActionsService } from 'src/app/shared/services/common-actions.service';
import { City } from './city';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

    constructor( private fb: FormBuilder,
      private cityService: CityService,
      private router: Router,
      private commonActionsService: CommonActionsService) { }
      form: FormGroup = new FormGroup({
        cityNameAr: new FormControl(''),
        cityNameEn: new FormControl(''),


      });
      saveLoading = false;
      submitted = false;
      isEdit:boolean = false;
      get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
      }
  id
      ngOnInit(): void {

        let currentLink = this.router.url;
        if (currentLink.includes('update')) {
          this.isEdit = true;

          let url = currentLink.split('/');
          let id = Number(url[url.length - 1]);
          this.getCityData(id);
        }

        this.form = this.fb.group({
          cityNameAr: ['', Validators.required],
          cityNameEn: ['', Validators.required],

        });
      }

      city: City = {
        cityId:'',
        cityNameAr: '',
        cityNameEn: ''
      }

      loading: boolean = false;

      private getCityData(id:number) {
        this.cityService.getCityData(id).subscribe(
          (response) => {

            this.city = response;

          },
          (err) => {}
        );
      }

      public addNewCity() {

        this.loading = true;
//if(this.form.invalid) return
        this.cityService.addNewCity(this.city).subscribe(
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
    this.router.navigate(['/city/view']);
  }

  invalidValidation(elment){
    return this.form.get(elment)?.invalid
  }

  touchedValidation(elment){
    return this.form.get(elment)?.touched
  }


    }
