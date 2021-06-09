import { EmployeeService } from './../employee.service';
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
  employees: Employee[] = [];


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();

  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }
}
