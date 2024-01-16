import { Component, OnInit } from '@angular/core';
import { ActionCode, Actions } from 'src/app/shared/actions_enums';
import { ActionsWithCode } from 'src/app/shared/actions_with_code';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.scss']
})
export class SchoolListComponent implements OnInit {
  constructor( private schoolService: SchoolService,
    ) { }
  ngOnInit(): void {
  }
  // Get all schools data from the server
  getAllSchools = (page: number | null = 0) => {
    return this.schoolService.getAllSchoolsByPage(page!);
  };
  displayedColumns: string[] = ['schoolId','schoolNameAr','schoolNameEn','actions'];
  deleteSchool=(schoolId: number | null = null)=>{

    return this.schoolService.deleteSchool(schoolId!);
  }
  actions: ActionsWithCode[] = [
   { action: Actions.Update, code: { type: ActionCode.Route, action: '/school/update',text:'delete',routeId:'schoolId' } },
   { action: Actions.Delete, code: { type: ActionCode.Route, action: this.deleteSchool,text:'delete',routeId:'schoolId' } },
  ];
}
