import { Routes } from '@angular/router';

export const customRoute: Routes = [
  {
    path: '',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },



];
