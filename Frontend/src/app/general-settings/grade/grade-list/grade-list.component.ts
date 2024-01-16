import { Component, OnInit } from '@angular/core';
import { GradeService } from '../grade.service';
import { ActionsWithCode } from 'src/app/shared/actions_with_code';
import { ActionCode, Actions } from 'src/app/shared/actions_enums';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  constructor( private gradeService: GradeService,
    ) { }
  ngOnInit(): void {
  }
  getAllGrades = (page: number | null = 0) => {
    return this.gradeService.getAllGradesByPage(page!);
  };
  displayedColumns: string[] = ['gradeId','gradeNameAr','gradeNameEn','actions'];
  deleteGrade=(gradeId: number | null = null)=>{

    return this.gradeService.deleteGrade(gradeId!);
  }
  actions: ActionsWithCode[] = [
   { action: Actions.Update, code: { type: ActionCode.Route, action: '/grade/update',text:'delete',routeId:'gradeId' } },
   { action: Actions.Delete, code: { type: ActionCode.Route, action: this.deleteGrade,text:'delete',routeId:'gradeId' } },
  ];
}
