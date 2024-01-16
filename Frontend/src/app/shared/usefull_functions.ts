import { ElementRef } from "@angular/core";
import * as XLSX from 'xlsx';
import { Sort } from '@angular/material/sort';

export class UsefullFunctions {
    static tableData: FilterSearch[] = [];
    static initialFilterdData(tableData) {
      this.tableData = tableData;
    }
    static filterListSearch(filterList, displayedColumns) :any[] {
      displayedColumns.forEach((column) => {
        if (column != 'actions') {
          var filterSearchColumn: FilterSearch = {
            property: column,
            checked: true,
          };
          filterList.push(filterSearchColumn);
        }
      });
      return filterList;
    }

    static filterTableDataBasedOnSearch(filterColumns, searchKey): any[] {
      //
      let filterdList: any[] = [];
      if (searchKey == '' || !searchKey) {
        return this.tableData;
      }
      filterdList = this.tableData.filter((data) => {
        let keys = Object.keys(data);
        for (let i = 0; i < filterColumns.length; i++) {
          let column = filterColumns[i];
          if(column.checked){
            if (keys.includes(column.property)) {

              if(data[column.property] == null){

              }
              else if (this.checkIfContainsSearchKey(searchKey.toString().toLowerCase(), data[column.property].toString().toLowerCase())) {
                return true;
              }
            }
          }

        }
        return false;
      });
      return filterdList;
    }
    static checkIfContainsSearchKey(searchKey, property) {
      return property == null ? false :  property.toString().toLowerCase().includes(searchKey.toLowerCase());
    }
    static printWindow(){
      window.print();
    }
    static ExportTOExcel(TABLE:ElementRef,length,numColumns) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
        TABLE.nativeElement
      );

      let columnChar = this.getActionColumnCharacter(length);
      for(let i = 0;i<numColumns + 2;i++){
        delete (ws[`${columnChar}${i}`])
      }
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'ScoreSheet.xlsx');
    }

    static getActionColumnCharacter(num){
      let columns = "ABCDEFGHIJKLMNOPQRST";
      return columns[num - 1];
    }

    static sortData(sort: Sort,sortedData,filteredData): any[] {
      const data = this.tableData.slice();
      if (!sort.active || sort.direction === '') {
        sortedData = data;
        return sortedData;
      }

      sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return compare(a[sort.active], a[sort.active], isAsc);
      });
      return sortedData;
    }

    static scrollToElement(element: HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
  }

  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  export interface FilterSearch {
    property: String;
    checked: true;
  }
