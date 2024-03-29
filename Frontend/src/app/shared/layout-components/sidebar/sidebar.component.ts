import {
  Component,
  ViewEncapsulation,
  HostListener,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';
import {  parentNavActive, switcherArrowFn } from './sidebar';
import { fromEvent } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { ContentLayoutComponent } from '../layout/content-layout/content-layout.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {

  public lang=localStorage.getItem('lang')

  static menuItems: Menu[];
  get menuItems() {
    return SidebarComponent.menuItems;
  }
  public set menuItems(value: Menu[]) {
    SidebarComponent.menuItems = value;
}
  public url: any;
  public windowSubscribe$!: any;
  constructor(
    private router: Router,
    private navServices: NavService,
    public translate: TranslateService,
    private activateRoute: ActivatedRoute,
    public elRef: ElementRef,
    private breakpointObserver: BreakpointObserver,


  ) {
    this.checkNavActiveOnLoad();
  }

  static counter = 0;

  public toggleNavActive(item){
    SidebarComponent.toggleNavActive(item);
  }
  // To set Active on Load
  checkNavActiveOnLoad() {
      let route = this.router.url;
      this.menuItems = this.getActiveNavItems();
      //console.log("Selected Menu Items",this.menuItems)

      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          let path = location.pathname.split('/');
          let eventUrl = event.url.split('/');
          if (path[path.length - 2] !== eventUrl[eventUrl.length - 2]) {
            this.closeNavActive();
            setTimeout(() => {
              let sidemenu = document.querySelectorAll('.nav-item.active');
              let subSidemenu = document.querySelectorAll(
                '.nav-sub-item.active'
              );
              sidemenu.forEach((e) => e.classList.remove('active'));
              subSidemenu.forEach((e) => e.classList.remove('active'));
            }, 100);
          }
        }
        if (event instanceof NavigationEnd) {
          this.menuItems.filter((items: any) => {
            if (items.path === event.url) {
              // this.setNavActive(items);
            }
            if (!items.children) {
              return false;
            }
            items.children.filter((subItems: any) => {
              if (subItems.path === event.url) {
                // this.setNavActive(subItems);
              }
              if (!subItems.children) {
                return false;
              }
              subItems.children.filter((subSubItems: any) => {
                if (subSubItems.path === event.url) {
                  // this.setNavActive(subSubItems);
                }
              });
              return;
            });
            return;
          });
          setTimeout(() => {
            parentNavActive();
          }, 200);
        }
      });
  }

  openNav(menuItem) {

    if(ContentLayoutComponent.menuItem == menuItem){
      menuItem.active = !menuItem.active;
      ContentLayoutComponent.menuItem = null;
      ContentLayoutComponent.closeNav();
      return;
    }else if(ContentLayoutComponent.isOpen()){
      ContentLayoutComponent.menuItem = menuItem;
      this.menuItems.forEach(item=>{
        item.active = false;
      });
      menuItem.active = !menuItem.active;
      return;
    }
    ContentLayoutComponent.menuItem = menuItem;
    ContentLayoutComponent.openNav();
    // this.setNavActive(menuItem);
    // this.toggleNavActive(menuItem)
    this.menuItems.forEach(item=>{
      item.active = false;
    });
    menuItem.active = !menuItem.active;
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
   closeNav() {
      // ContentLayoutComponent.closeNav();
      this.closeNavActive();
    }

  checkCurrentActive() {

   // console.log("hr items",this.navServices.hrItems)
    this.navServices.baseItems.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
    //  console.log("menu items",this.menuItems)
      let currentUrl = this.router.url;
      menuItems.filter((items: any) => {
        if (items.path === currentUrl) {
          this.setNavActive(items);
        }
        if (!items.children) {
          return false;
        }
        items.children.filter((subItems: any) => {
          if (subItems.path === currentUrl) {
            this.setNavActive(subItems);
          }
          if (!subItems.children) {
            return false;
          }
          subItems.children.filter((subSubItems: any) => {
            if (subSubItems.path === currentUrl) {
              this.setNavActive(subSubItems);
            }
          });
          return;
        });
        return;
      });
    });
  }
  //Active Nav State
  setNavActive(item: any) {

    this.menuItems.filter((menuItem) => {
      if(menuItem == item){
        menuItem.active = true;
      }
      if (menuItem !== item) {
        menuItem.active = false;
        this.navServices.collapseSidebar = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Toggle menu
  static toggleNavActive(item: any) {
    if(ContentLayoutComponent.menuItem == item){
      return;
    }
    if (!item.active) {
      this.menuItems.forEach((a: any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
        return;
      });
    }
    item.active = !item.active;
    ContentLayoutComponent.menuItem = item;
  }

  // Close Nav menu
  closeNavActive() {

    // ContentLayoutComponent.closeNav();
    // this.menuItems.forEach((a: any) => {
    //   if (this.menuItems) {
    //     a.active = false;
    //   }
    //   if (!a.children) {
    //     return false;
    //   }
    //   a.children.forEach((b: any) => {
    //     if (a.children) {
    //       b.active = false;
    //     }
    //   });
    //   return;
    // });
  }

  static closeActiveItemFromSubMenu(item) {
    this.toggleNavActive(item);
  }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'en';
   // switcherArrowFn();

    fromEvent(window, 'resize').subscribe(() => {
      if (window.innerWidth >= 992) {
        document
          .querySelector('body.horizontalmenu')
          ?.classList.remove('sidenav-toggled');
      }
      if (
        document
          .querySelector('body')
          ?.classList.contains('horizontalmenu-hover') &&
        window.innerWidth > 772
      ) {
        let li = document.querySelectorAll('.side-menu li');
        li.forEach((e, i) => {
          e.classList.remove('is-expanded');
        });
      }
    });

    // detect screen size changes
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          // small screen
          this.checkCurrentActive();
        } else {
          // large screen
          document
            .querySelector('body.horizontalmenu')
            ?.classList.remove('sidenav-toggled');
          if (document.querySelector('.horizontalmenu')) {
            this.closeNavActive();
            setTimeout(() => {
              parentNavActive();
            }, 300);
          }
        }
      });

    let vertical: any = document.querySelectorAll('#myonoffswitch34');
    let horizontal: any = document.querySelectorAll('#myonoffswitch35');
    let horizontalHover: any = document.querySelectorAll('#myonoffswitch111');
    fromEvent(vertical, 'click').subscribe(() => {
      this.checkCurrentActive();
    });
    fromEvent(horizontal, 'click').subscribe(() => {
      this.closeNavActive();
    });
    fromEvent(horizontalHover, 'click').subscribe(() => {
      this.closeNavActive();
    });

    const WindowResize = fromEvent(window, 'resize');
    // subscribing the Observable
    this.windowSubscribe$ = WindowResize.subscribe(() => {
      let menuWidth: any = document.querySelector<HTMLElement>('.main-body-1');
      let menuItems: any = document.querySelector<HTMLElement>('.menu-nav');
      let mainSidemenuWidth: any =
        document.querySelector<HTMLElement>('.main-sidemenu');
      let menuContainerWidth =
        menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
      let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split('px')[0])
      );
      let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginRight.split('px')[0])
      );
      let check =
        menuItems.scrollWidth +
        (0 - menuWidth?.offsetWidth) +
        menuContainerWidth;
      if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
        document.querySelector('.slide-left')?.classList.add('d-none');
        document.querySelector('.slide-right')?.classList.add('d-none');
      }

      // to check and adjst the menu on screen size change
      if (document.querySelector('body')?.classList.contains('ltr')) {
        if (
          marginLeftValue > -check == false &&
          menuWidth?.offsetWidth - menuContainerWidth < menuItems.scrollWidth
        ) {
          menuItems.style.marginLeft = -check;
        } else {
          menuItems.style.marginLeft = 0;
        }
      } else {
        if (
          marginRightValue > -check == false &&
          menuWidth?.offsetWidth < menuItems.scrollWidth
        ) {
          menuItems.style.marginRight = -check;
        } else {
          menuItems.style.marginRight = 0;
        }
      }
     // checkHoriMenu();
    });

    let maincontent: any = document.querySelectorAll(".main-content");
    fromEvent(maincontent, "click").subscribe(() => {
      if (
        document.querySelector("body")?.classList.contains("horizontalmenu")
      ) {
        this.closeNavActive();
      }
    });
  }

  sidebarClose() {
    if ((this.navServices.collapseSidebar = true)) {
      document.querySelector('.app')?.classList.remove('sidenav-toggled');
      this.navServices.collapseSidebar = false;
    }
  }

  static setAllInActive(){
    this.menuItems.forEach(item=>{
      item.active = false;
    });
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 70;
  }

  ngOnDestroy() {
    // unsubscribing the Observable
    this.windowSubscribe$.unsubscribe();
  }





  private getActiveNavItems():Menu[]{

      return this.navServices.BaseMENUITEMS;

  }

}
