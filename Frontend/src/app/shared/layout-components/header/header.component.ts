import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { Menu, NavService } from '../../services/nav.service';
import { SwitcherService } from '../../services/switcher.service';
import { TranslateService } from '@ngx-translate/core';
import * as switcher from '../switcher/switcher';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = true;
  public lang: any;
  static showPulse:string[] = [];

  constructor(
    private layoutService: LayoutService,
    public SwitcherService: SwitcherService,
    public navServices: NavService,
    private router: Router,
    private modalService: NgbModal,
    private translate: TranslateService,

  ) {
    this.lang = localStorage.getItem('lang');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // To clear and close the search field on page navigation
        this.clearSearch();
      }
    });
  }
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
   toggleSwitcher() {
    this.SwitcherService.emitChange(true);
  }

  toggleSidebarNotification() {
    this.layoutService.emitSidebarNotifyChange(true);
  }



  open(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      windowClass: 'modalCusSty',
      size: 'lg',
    });
  }


    // Search
  public menuItems!: Menu[];
  public items!: Menu[];
  public text!: string;
  public SearchResultEmpty:boolean = false;

  ngOnInit(): void {

    this.navServices.baseItems.subscribe((menuItems) => {
      this.items = menuItems;
    });
    let maincontent: any = document.querySelectorAll(".main-content");
    fromEvent(maincontent, "click").subscribe(() => {
        this.clearSearch();
    });
    this.text = '';
  }

  changeLang(event:any){
    let body = document.querySelector('body');
    let html = document.querySelector('html');
    this.translate.use(event.target.value);
    localStorage.setItem('lang', event.target.value);
    if(event.target.value == 'en')
    {
      switcher.ltrFn();
      html?.setAttribute('lang', 'en');
    }
    else
    {
      switcher.rtlFn();
      html?.setAttribute('lang', 'ar');
    }
 }

  Search(searchText: any) {
    if (!searchText) return this.menuItems = [];
    // items array which stores the elements
    let items:any[] = [];
    // Converting the text to lower case by using toLowerCase() and trim() used to remove the spaces from starting and ending
    searchText = searchText.toLowerCase().trim();
    this.items.filter((menuItems:any) => {
      // checking whether menuItems having title property, if there was no title property it will return
      if (!menuItems?.title) return false;
      //  checking wheteher menuitems type is text or string and checking the titles of menuitems
      if (menuItems.type === 'link' && menuItems.title.toLowerCase().includes(searchText)) {
        // Converting the menuitems title to lowercase and checking whether title is starting with same text of searchText
        if( menuItems.title.toLowerCase().startsWith(searchText)){// If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(menuItems))
          // If both are matching then the code is pushed to items array
          items.push(menuItems);
        }
      }
      //  checking whether the menuItems having children property or not if there was no children the return
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems:any) => {
        if (subItems.type === 'link' && subItems.title.toLowerCase().includes(searchText)) {
          if( subItems.title.toLowerCase().startsWith(searchText)){         // If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subItems))
            items.push(subItems);
          }

        }
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems:any) => {
          if (subSubItems.title.toLowerCase().includes(searchText)) {
            if( subSubItems.title.toLowerCase().startsWith(searchText)){// If you want to get all the data with matching to letter entered remove this line(condition and leave items.push(subSubItems))
              items.push(subSubItems);
            }
          }
        })
        return;
      })
      return this.menuItems = items;
    });
    // Used to show the No search result found box if the length of the items is 0
    if(!items.length){
      this.SearchResultEmpty = true;
    }
    else{
      this.SearchResultEmpty = false;
    }
    return;
  }

  //  Used to clear previous search result
  clearSearch() {
    this.text = '';
    this.menuItems = [];
    this.SearchResultEmpty = false;
    return this.text, this.menuItems
  }
  public dirWithLan() {

  }
  public showPuls(){
    return HeaderComponent.showPulse.length;
  }

  public getAllNoitifications():any[]{
    return  HeaderComponent.showPulse;
  }

  public clickOnModuleNotifications(link){
    HeaderComponent.showPulse = HeaderComponent.showPulse.filter((noti)=> !noti.toLowerCase().includes(link.toLocaleLowerCase()));
  }

  public showBadgeForModule(module){
    for(var i =0;i<HeaderComponent.showPulse.length;i++){
      var notification = HeaderComponent.showPulse[i];
      if(notification.toLocaleLowerCase().includes(module.toLocaleLowerCase())){
        return true;
      }
    }
    return false;
  }


}


