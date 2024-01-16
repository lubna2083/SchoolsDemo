import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolListComponent } from './school-list/school-list.component';
import { SchoolFormComponent } from './school-form/school-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component:SchoolListComponent
      },
      {
        path: 'add',
        component: SchoolFormComponent
      },
      {
        path: 'update/:id',
        component: SchoolFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class SchoolRoutingModule { }
