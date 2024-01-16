import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from './city-form/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addNewCity(city:City):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/city/save`,city);
  }

  public getAllCitiesByPage(page:Number): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/city/all/${page}`);
  }
  public deleteCity(cityId): Observable<any>{
    return this.http.put<any>(`${this.apiServerUrl}/city/delete`,cityId);
  }

  public getCityData(cityId): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/city/find/${cityId}`);
  }
  public getAllCities(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/city/all`);
  }
}
