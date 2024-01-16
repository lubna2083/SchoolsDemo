import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addNewGrade(grade):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/grade/save`,grade);
  }

  public getAllGradesByPage(page:Number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/grade/all/${page}`);
  }
  public deleteGrade(gradeId): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/grade/delete`,gradeId);
  }

  public getGradeData(gradeId): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/grade/find/${gradeId}`);
  }
  public getAllGrades(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/grade/all`);
  }
  public getGradsBySchool(schoolId): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/grade/findBySchool/${schoolId}`);
  }

  public getRemainingCapacity(gradeId:number): Observable<any>{
    debugger
     console.log(`${this.apiServerUrl}/grade/checkCapacity/${gradeId}`)
    return this.http.get<any>(`${this.apiServerUrl}/grade/checkCapacity/${gradeId}`);

  }
}
