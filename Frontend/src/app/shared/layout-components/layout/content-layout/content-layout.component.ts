import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/shared/services/nav.service';

import { SwitcherService } from 'src/app/shared/services/switcher.service';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent {
  layoutSub!: Subscription;
  sidenavtoggled1: any;
  dash: any;
  static menuItem: any;
  lang;

  get menuItems() {
    return ContentLayoutComponent.menuItem?.children;
  }
  get getMenuTitle() {
    return ContentLayoutComponent.menuItem?.title;
  }
  get closeNavSide() {
    return ContentLayoutComponent.closeNav();
  }

  constructor(
    private SwitcherService: SwitcherService,
    public translate: TranslateService,
    public router: Router
  ) {

    this.dash=(localStorage.getItem('dash'))?.toString();



    this.lang = this.translate.currentLang;

  }

  toggleSwitcherBody() {
    SidebarComponent.setAllInActive();
    ContentLayoutComponent.menuItem = null;
    const screenWidth = window.screen.width;
    if(screenWidth <= 1550){
      let sidemenu = document.getElementById('sidemenu');
      sidemenu?.classList.add('main-sidebar')
    }
    if (document.getElementById('mySidenav')!.style.width == '250px') {
      document.getElementById('mySidenav')!.style.width = '0';
      if(document.getElementById('main') != null)
      document.getElementById('main')!.style.marginLeft = '0';
      return;
    }
  }

  ngOnDestroy() {
    location.reload();
  }
  // private getUserRole(): string {
  //   return this.authenticationService.getUserFromLocalCache().role;
  // }

  static isOpen(): boolean{
    return document.getElementById('mySidenav')!.style.width == '250px';
  }
  static openNav() {

    if (document.getElementById('mySidenav')!.style.width == '250px') {
      this.closeNav();
      return;
    }
    const screenWidth = window.screen.width;
    if(screenWidth <= 1550){
      let sidemenu = document.getElementById('sidemenu');
      sidemenu?.classList.remove('main-sidebar')
    }
    document.getElementById('mySidenav')!.style.width = '250px';
    if(document.getElementById('main') != null)
    document.getElementById('main')!.style.marginLeft = '250px';
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  static closeNav() {
    // SidebarComponent.closeActiveItemFromSubMenu(this.menuItem);
    this.menuItem = null;
    const screenWidth = window.screen.width;
    if(screenWidth <= 1550){
      let sidemenu = document.getElementById('sidemenu');
      sidemenu?.classList.add('main-sidebar')
    }
    if (document.getElementById('mySidenav')!.style.width == '250px') {
      document.getElementById('mySidenav')!.style.width = '0';
      if(document.getElementById('main') != null)
      document.getElementById('main')!.style.marginLeft = '0';
      return;
    }

  }

  handleClick(){
    this.closeNavSide;
  }
  checkDash(){
    this.dash!=(localStorage.getItem('dash'))?.toString()

   // alert(localStorage.getItem('dash'))
  }
}
