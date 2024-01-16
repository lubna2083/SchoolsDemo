import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CityListComponent } from './city-list/city-list.component';
import { CityFormComponent } from './city-form/city-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        component:CityListComponent
      },
      {
        path: 'add',
        component: CityFormComponent
      },
      {
        path: 'update/:id',
        component: CityFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,TranslateModule]
})
export class CityRoutingModule { }
