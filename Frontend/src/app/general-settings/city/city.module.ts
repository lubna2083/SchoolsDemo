import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { CityFormComponent } from './city-form/city-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CityListComponent,
    CityFormComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    ReactiveFormsModule,
    SharedModule,

    NgSelectModule,
  ]
})
export class CityModule { }
