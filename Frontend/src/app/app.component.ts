import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as switcher from './shared/layout-components/switcher/switcher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ar');
    const lang = localStorage.getItem('lang') || 'ar';
    this.translate.use(lang);
    document.documentElement.lang = lang;
    let html = document.querySelector('html');
    if(lang == 'ar')
    {
      switcher.rtlFn();
      html?.setAttribute('lang', 'ar');
    }
    else
    {
      switcher.ltrFn();
      html?.setAttribute('lang', 'en');
    }

  }
  ngOnInit() {
    fromEvent(window, 'load').subscribe(() => document.querySelector('#glb-loader')?.classList.remove('loaderShow'));
  }

}
