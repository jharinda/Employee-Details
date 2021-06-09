import { Employee } from './../employee';
import { EMPLOYEES } from './../mock-employees';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  selectedEmployee?: Employee;
  employees = EMPLOYEES;


  constructor() { }

  ngOnInit(): void {

  }

  onSelect(employee: Employee) {
    console.log(`${employee.id} clicked`);
    this.selectedEmployee = employee;
  }



}
