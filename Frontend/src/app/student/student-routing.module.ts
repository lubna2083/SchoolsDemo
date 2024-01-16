import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component:StudentListComponent
      },
      {
        path: 'add',
        component: StudentFormComponent
      },
      {
        path: 'update/:id',
        component: StudentFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class StudentRoutingModule { }
