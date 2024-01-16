import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { School } from './school';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addNewSchool(school:School):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/school/save`,school);
  }

  public getAllSchoolsByPage(page:Number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/school/all/${page}`);
  }
  public deleteSchool(schoolId:number): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/school/delete`,schoolId);
  }

  public getSchoolData(schoolId:number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/school/find/${schoolId}`);
  }
  public getAllSchools(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/school/all`);
  }
  public getSchoolsByCity(cityId): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/school/findByCity/${cityId}`);
  }
}
