import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addNewStudent(student):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/student/save`,student);
  }
  public addNewStudentList(students):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/student/saveAll`,students);
  }
  public getAllStudentsByPage(page:Number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/student/all/${page}`);
  }
  public deleteStudent(studentId): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/student/delete`,studentId);
  }


  public getAllStudents(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/student/all`);
  }

}
