import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = "api/employees";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl).pipe(
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;

    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getHero id=${id}`))
    )
  }
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.employeeUrl, employee, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    )
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
