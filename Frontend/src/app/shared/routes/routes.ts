import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },



  {
    path: 'city',
    loadChildren: () => import('../../../app/general-settings/city/city.module').then(m => m.CityModule)
  },
  {
    path: 'school',
    loadChildren: () => import('../../../app/general-settings/school/school.module').then(m => m.SchoolModule)
  },
  {
    path: 'grade',
    loadChildren: () => import('../../../app/general-settings/grade/grade.module').then(m => m.GradeModule)
  },
  {
    path: 'student',
    loadChildren: () => import('../../../app/student/student.module').then(m => m.StudentModule)
  },






];
