import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {

  //employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();


  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.employeeService.employees$ = this.searchTerms.pipe(
      debounceTime(0),
      distinctUntilChanged(),
      switchMap((term: string) => this.employeeService.searchEmployees(term))
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
