import { SharedService } from './../shared.service';
import { MessageService } from './../message.service';
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  selectedEmployee?: Employee;
  employees: Employee[] = [];
  isOnSearch: boolean = false;
  cities?: any;
  private searchTerms = new Subject<string>();

  constructor(
    public employeeService: EmployeeService,
    private messageSerivce: MessageService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getAllCities();
    this.getTerms();

  }
  log(term: any) { console.log(term); }

  getTerms() {
    this.employeeService.employees$ = this.searchTerms.pipe(
      debounceTime(0),
      distinctUntilChanged(),
      switchMap((term: string) => this.employeeService.searchEmployees(term))
    )

  }
  search(term: string): void {
    this.isOnSearch = true;
    this.searchTerms.next(term);
  }

  getAllCities() { this.employeeService.getAllCities().subscribe(city => { this.cities = city }); }

  getEmployees() { this.employeeService.getEmployees().subscribe(employees => this.employees = employees); }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
    this.messageSerivce.addMessage(`${employee.firstName} Deleted`);
  }



}
