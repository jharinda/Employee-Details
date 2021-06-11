import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://localhost:5000/api/employee';

  constructor(private http: HttpClient) { }

  getCities(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/GetAllCities');
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl);
  }

  getEmployee(val: any): Observable<any[]> {
    let test;


    return this.http.get<any>(this.APIUrl + "/" + val);
  }


  addEmployee(val: any) {
    return this.http.post<any>(this.APIUrl, val);
  }

  updateEmployee(val: any, id: number) {
    return this.http.put<any>(this.APIUrl + '/' + id, val);
  }

  deleteEmployee(val: any) {
    return this.http.delete<any>(this.APIUrl + '/' + val);
  }

  searchEmployeeByCity(cityId: any) {
    return this.http.get<any>(`${this.APIUrl}/city/${cityId}`);
  }







}
