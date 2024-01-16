import { TranslateService } from "@ngx-translate/core";

export class UsefullClassFunctions {
    static translate: TranslateService;
    constructor(){}
    static getWeekDay(index): string {
        switch (index) {
          case 0:
            return this.translate.instant('sunday');
          case 1:
            return this.translate.instant('monday');
          case 2:
            return this.translate.instant('tuesday');
          case 3:
            return this.translate.instant('wednesday');
          case 4:
            return this.translate.instant('thursday');
          case 5:
            return this.translate.instant('friday');
          case 6:
            return this.translate.instant('saturday');
          default:
            return this.translate.instant('sunday');
        }
      }
}