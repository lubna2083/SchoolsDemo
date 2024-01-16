import { Component, OnInit } from '@angular/core';
import { ActionCode, Actions } from 'src/app/shared/actions_enums';
import { ActionsWithCode } from 'src/app/shared/actions_with_code';
import { CityService } from '../city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  constructor( private cityService: CityService,
    ) { }
  ngOnInit(): void {
  }
  getAllCities = (page: number | null = 0) => {
    return this.cityService.getAllCitiesByPage(page!);
  };
  displayedColumns: string[] = ['cityId','cityNameAr','cityNameEn','actions'];
  deleteCity=(cityId: number | null = null)=>{

    return this.cityService.deleteCity(cityId!);
  }
  actions: ActionsWithCode[] = [
   { action: Actions.Update, code: { type: ActionCode.Route, action: '/city/update',text:'delete',routeId:'cityId' } },
   { action: Actions.Delete, code: { type: ActionCode.Route, action: this.deleteCity,text:'delete',routeId:'cityId' } },
  ];
}
