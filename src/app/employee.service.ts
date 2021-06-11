import { SharedService } from './shared.service';
import { EMPLOYEES } from './mock-employees';
import { Employee } from './employee';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private employeeUrl = "api/employees";
  private employeeUrl = "http://localhost:5000/api/employees";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private sharedService: SharedService) { }

  addEmployee(employee: Employee): Observable<Employee> {
    // return this.http.post<Employee>(this.employeeUrl, employee, this.httpOptions).pipe(
    //   tap(_ => console.log(`Employee Added`)
    //   ), catchError(this.handleError<Employee>('addHero'))
    // )

    console.log(employee);

    return this.sharedService.addEmployee(employee).pipe(
      tap(_ => console.log(`Empl Added`)
      ), catchError(this.handleError<Employee>('Add Employee'))
    )
  }

  getAllCities(): Observable<any[]> {
    return this.sharedService.getCities().pipe(
      tap(_ => console.log(`Cities Loaded`)),
      catchError(this.handleError<any>('Failed to Load Cities')))
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeeUrl}/${id}`;
    return this.sharedService.deleteEmployee(id).pipe(
      tap(_ => console.log(`Employee Deleted id=${id}`)),
      catchError(this.handleError<Employee>('Employee Delete'))
    );
    // return this.http.delete<Employee>(url, this.httpOptions).pipe(
    //   tap(_ => console.log(`Employee Deleted id=${id}`)),
    //   catchError(this.handleError<Employee>('Employee Delete'))
    // )


  }

  getEmployees(): Observable<Employee[]> {
    // return this.http.get<any>(this.employeeUrl).pipe(
    //   catchError(this.handleError<Employee[]>('getEmployees', []))
    // );

    return this.sharedService.getEmployees().pipe(
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<any> {
    const url = `${this.employeeUrl}/${id}`;

    // return this.http.get<Employee>(url).pipe(
    //   catchError(this.handleError<Employee>(`getHero id=${id}`))
    // )
    return this.sharedService.getEmployee(id).pipe(
      catchError(this.handleError<Employee>(`getHero id=${id}`))
    )
  }

  updateEmployee(employee: any, id: number): Observable<any> {

    // return this.http.put(this.employeeUrl, employee, this.httpOptions).pipe(
    //   tap(_ => console.log("Sucess update")),
    //   catchError(this.handleError<any>('updateHero'))
    // )

    return this.sharedService.updateEmployee(employee, id).pipe(
      tap(_ => console.log("Sucess update")),
      catchError(this.handleError<any>('updateHero'))
    )




  }
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.sharedService.searchEmployeeByCity(term).pipe(
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
