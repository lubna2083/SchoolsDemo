import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { GradeListComponent } from './grade-list/grade-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component:GradeListComponent
      },
      {
        path: 'add',
        component: GradeFormComponent
      },
      {
        path: 'update/:id',
        component: GradeFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class GradeRoutingModule { }
