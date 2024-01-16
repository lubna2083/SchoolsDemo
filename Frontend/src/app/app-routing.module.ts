import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContentLayoutComponent } from './shared/layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './shared/layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './shared/layout-components/layout/full-layout/full-layout.component';
import { customRoute } from './shared/routes/custom.routes';
import { errorRoute } from './shared/routes/error.routes';
import { content } from './shared/routes/routes';
import { TranslateModule } from '@ngx-translate/core';



const routes: Routes = [

  {
    path: '',
    component: ContentLayoutComponent,
 // canActivate: [AuthenticationGuard],
    children: content
  },
  {
    path: '',
    component: FullLayoutComponent,
   //canActivate: [AuthenticationGuard],
    children: customRoute
  },
  {
    path: '',
    component: ContentLayoutComponent,
 // canActivate: [AuthenticationGuard],
    children: content
  },

  {
    path: '',
    redirectTo: 'dashboard/customerInformation/view',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: FullLayoutComponent,
  //   // canActivate: [AdminGuard],
  //   children: customRoute
  // },
  // {
  //   path: '',
  //   component: ContentLayoutComponent,
  //   // canActivate: [AdminGuard],
  //   children: content
  // },

  // {
  //   path: '',
  //   component: SwitcherLayoutComponent,
  //   // canActivate: [AdminGuard],
  //   children: switcher
  // },

  {
    path: '',
    component: ErrorLayoutComponent,
    // canActivate: [AdminGuard],
    children: errorRoute
  },
  {
    path: '**',
    redirectTo: '/error-pages/error-404'
  },
];@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule, TranslateModule]
})
export class AppRoutingModule { }
