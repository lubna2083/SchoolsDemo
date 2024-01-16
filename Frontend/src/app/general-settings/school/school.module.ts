import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolRoutingModule } from './school-routing.module';
import { SchoolFormComponent } from './school-form/school-form.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SchoolFormComponent,
    SchoolListComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    NgbModule,FormsModule
  ]
})
export class SchoolModule { }
