import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


// API url
baseApiUrl = "https://file.io"
baseImagePath="../../../uploadFile/"
constructor(private http:HttpClient) { }
private apiServerUrl = environment.apiBaseUrl
// Returns an observable
uploadd(file):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.baseApiUrl, formData)
}
////////////////////////////

upload(formData: FormData): Observable<HttpEvent<string[]>> {
  return this.http.post<string[]>(`${this.apiServerUrl}/file/upload`, formData, {
    reportProgress: true,
    observe: 'events'
  });
}
}
