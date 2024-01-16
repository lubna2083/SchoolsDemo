import { NgModule, createComponent } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout-components/header/header.component';
import { FooterComponent } from './layout-components/footer/footer.component';
import { LoaderComponent } from './layout-components/loader/loader.component';
import { PageHeaderComponent } from './layout-components/page-header/page-header.component';
import { SidebarComponent } from './layout-components/sidebar/sidebar.component';
import { TabToTopComponent } from './layout-components/tab-to-top/tab-to-top.component';
import { ContentLayoutComponent } from './layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './layout-components/layout/error-layout/error-layout.component';
import { FullLayoutComponent } from './layout-components/layout/full-layout/full-layout.component';
import { NgbActiveModal, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { SwitcherLayoutComponent } from './layout-components/layout/switcher-layout/switcher-layout.component';
import { SwitcherHeaderComponent } from './layout-components/switcher-header/switcherheader.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';



import { SwitcherComponent } from './layout-components/switcher/switcher.component';
import { RightSidebarComponent } from './layout-components/right-sidebar/right-sidebar.component';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { CustomMatTableComponent } from './custom-mat-table/custom-mat-table.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        PageHeaderComponent,
        SidebarComponent,
         SwitcherComponent,
        TabToTopComponent,
        ContentLayoutComponent,
        SwitcherLayoutComponent,
        ErrorLayoutComponent,
        FullLayoutComponent,
         RightSidebarComponent,
        FullscreenDirective,
         HoverEffectSidebarDirective,
        SidemenuToggleDirective,
        ToggleThemeDirective,
        SwitcherHeaderComponent,
        CustomMatTableComponent,
    ],
    exports: [
        PageHeaderComponent,
        TabToTopComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ErrorLayoutComponent,
         SwitcherComponent,
        LoaderComponent,
        SwitcherLayoutComponent,

        CustomMatTableComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        },
    ],
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        PerfectScrollbarModule,
        ColorPickerModule,
        FormsModule,
        NgSelectModule,
        MatTableModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        NgSelectModule,
        NgxDatatableModule,
        NgbModule,
        MatPaginatorModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatListModule,
        MatTooltipModule,
        MatSortModule,

        NgbDropdownModule,
        TranslateModule,
    ],

})
export class SharedModule {}
