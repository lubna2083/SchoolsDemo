import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonActionsService {
  private printStyle = `
  <style>
  @page { size: auto;  margin: 0mm; }
          h2{
            text-align: center
          }
            table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            }

            td, th {
              border: 1px solid #dddddd;
              text-align: center;
              padding: 8px;
            }

            tr:nth-child(even) {
              background-color: #dddddd;
            }
          </style>`;
  constructor(private translate: TranslateService,private toastr: ToastrService,) {}

  public deleteService(deleteFunction, deleteTextDialog): void {
    Swal.fire({
      icon: 'error',
      title: this.translate.instant('AreyouSuretodeleteTheRecord'),
      confirmButtonText: this.translate.instant('delete'),
      cancelButtonText: this.translate.instant('cancel'),
      showCancelButton: true,
      confirmButtonColor: 'red',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteFunction();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  public printService(headers, rows, title): void {
    let popupWin;
    let tableRows = '';
    let tableHeaders = '';
    let isAr = this.translate.currentLang == 'ar';
    tableHeaders = tableHeaders.concat(
      this.getTableHeaders(headers,isAr)
    );
    tableRows = tableRows.concat(
      this.getTableDataRows(headers.length, rows, isAr)
    );


    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.write(
      `
      <html>
        <head>
          <title>${title}</title>
          ${this.printStyle}
        </head>
    <body onload="window.print();window.close()">
      <h2>${title}</h2>
      <table>
        <tr>${tableHeaders}</tr>
        ${tableRows}
      </table>
    </body>
      </html>`
    );
    popupWin.document.close();
  }
  private getTableDataRows(numberOfHeaders, rowsData, isAr): string {
    //
    let rows = '';
    rowsData.forEach((row) => {
      rows=rows.concat('<tr>')
      const data = Object.values(row);
      if (!isAr) {
        data.reverse();
      }
      for (let i = 0; i < numberOfHeaders; i++) {
        rows = rows.concat(`
        <td>${data[i]}</td>
        `);
      }
      rows = rows.concat('</tr>');
    });

    console.log(rows);
    return rows;
  }
  private getTableHeaders(tableHeaders,isAr): string{
    let headers = "";
    if(isAr){
      tableHeaders.reverse();
    }
    tableHeaders.forEach(header=>{
      headers = headers.concat(`<th>${header}</th>`);
    });
    return headers;
  }

  public showSuccessToast(){
    this.toastr.success(
      this.translate.instant('toastrSaveSuccess'),
    );
  }
  public showErrorToast(){
    this.toastr.error(
      this.translate.instant('toastrSaveError'),
    );

  }
  public showfillErrorToast(){
    this.toastr.error(
      this.translate.instant('fillAllFields'),
    );

  }
}
