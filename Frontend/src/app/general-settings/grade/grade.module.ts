import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    GradeListComponent,
    GradeFormComponent
  ],
  imports: [
    CommonModule,
    GradeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    FormsModule
  ]
})
export class GradeModule { }
