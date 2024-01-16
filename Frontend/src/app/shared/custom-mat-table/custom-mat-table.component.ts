import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActionsWithCode } from '../actions_with_code';
import { Router } from '@angular/router';
import { CommonActionsService } from '../services/common-actions.service';
import * as XLSX from 'xlsx';
import { Sort } from '@angular/material/sort';
import { FilterSearch, UsefullFunctions } from '../usefull_functions';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-custom-mat-table',
  templateUrl: './custom-mat-table.component.html',
  styleUrls: ['./custom-mat-table.component.scss'],
})
export class CustomMatTableComponent implements OnInit {
  @Input() displayedColumns!: string[];
  @Input() getData;

  @Input() actions: ActionsWithCode[] = [];
  @Input() createRoute;
  @Input() toggleCreate: Function = () => { };
  @Input() toggleEdit: Function = () => { };
  printColumns: any[] = [];
  @ViewChild('TABLE', { static: false })
  TABLE!: ElementRef;
  tableData: any[] = [];
  pageable: number = 0;
  filteredData: FilterSearch[] = [];
  currentLink;

  @ViewChild('pdfPrint') pdfPrint!: ElementRef;
  @ViewChild('myDropdown', { static: false }) myDropdown!: ElementRef;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;
  pdfTable!: ElementRef;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private commonActionsService: CommonActionsService,
    private translate: TranslateService,
    private modalService: NgbModal,

  ) { }
  loading: boolean = true;
  pageableLoading: boolean = false;
  collectionSize;
  ngOnInit(): void {


    this.filteredData = UsefullFunctions.filterListSearch(
      this.filteredData,
      this.displayedColumns
    );
    this.getDataByPage(1);
    this.currentLink = this.router.url;
  }
  public actionClick(action, element) {
    debugger
    if (action.action == 1) {
      debugger
      this.router.navigateByUrl(
        `${action.code.action}/${element[action.code.routeId]}`
      );
    }
    else if (action.action == 3) {

    }
    else {
      this.commonActionsService.deleteService(
        () =>
          action.code.action(element[action.code.routeId]).subscribe(
            (response) => {
              this.deleteItmeFromTableDataAfterDelete(
                element[action.code.routeId],
                action.code.routeId
              );
              this.toastr.success(
                this.translate.instant('toastrDeleteSuccess'),
                this.translate.instant('successfullyCompleted')
              );
              if(!response)
                this.createRoute = true
            },
            (err) => {
              if (err.status == 200) {
                this.deleteItmeFromTableDataAfterDelete(
                  element[action.code.routeId],
                  action.code.routeId
                );
                this.toastr.success(
                  this.translate.instant('toastrDeleteSuccess'),
                  this.translate.instant('successfullyCompleted')
                );
              } else {
                this.toastr.error(
                  this.translate.instant('toastrDeleteError'),
                  this.translate.instant('errorOccurred')
                );
              }
            }
          ),
        action.code.text
      );
    }
  }
  private deleteItmeFromTableDataAfterDelete(id, property) {
    let index = this.tableData.findIndex(
      (element) => element[property].toString() == id.toString()
    );
    if (index != -1) {
      this.tableData.splice(index, 1);
    }
  }
  public createRouter() {
    debugger
    this.router.navigateByUrl(this.createRoute);
  }
  public page($event) {
    this.getDataByPage($event);
  }
  public getDataByPage(page) {
    this.loading = true;
    this.getData(page - 1).subscribe(
      (response) => {
        debugger;

        this.tableData = response.content;


        // if(this.tableData.length != 0 && (this.tableData[0].socialId || this.tableData[0].termId || this.tableData[0].aboutUsId))
        //   this.createRoute = null
        console.log(response.content)
        UsefullFunctions.initialFilterdData(this.tableData);
        this.loading = false;
        this.pageableLoading = false;
        this.collectionSize = response.totalElements;
      },
      (err) => {
        this.pageableLoading = false;
        this.loading = false;
      }
    );
  }
  public loadMoreData() {
    this.pageableLoading = true;
    this.pageable = this.pageable + 1;
    // this.getDataByPage();
  }
  public filterSearchByKey(key) {
    this.tableData = UsefullFunctions.filterTableDataBasedOnSearch(
      this.filteredData,
      key
    );
  }
  public print() {
    UsefullFunctions.printWindow();
  }
  public exportToExcel() {
    UsefullFunctions.ExportTOExcel(this.TABLE, this.displayedColumns.length, this.tableData.length);
  }
  public sortData(sort: Sort) {
    this.tableData = UsefullFunctions.sortData(
      sort,
      this.tableData,
      this.filteredData
    );
  }

  public getDisplayedColumnsForPrint(): any[] {
    this.printColumns = [...this.displayedColumns];
    if (this.printColumns.includes('actions')) {
      this.printColumns.splice(this.printColumns.length - 1, 1);
    }
    if (this.printColumns.includes('active')) {
      this.printColumns.splice(0, 1);
    }
    return this.printColumns;
  }
  public close() {
    this.myDropdown.nativeElement.classList.remove('show');
  }
}
