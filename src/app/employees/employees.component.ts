import { SharedService } from './../shared.service';
import { MessageService } from './../message.service';
import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  selectedEmployee?: Employee;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private messageSerivce: MessageService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getAllCities();

  }

  getAllCities() {
    // this.sharedService.getEmployees().subscribe(data => {
    //   this.employees = data;
    // })

    // console.log(this.employees);

  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);


  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
    this.messageSerivce.addMessage(`${employee.firstName} Deleted`);
  }

  add(employeeFirstName: string,
    employeeSecondName: string,
    employeeDob: string,
    employeeTelephone: string,
    employeeEmail: string,
    employeeMaritalStatus: string,
    employeeCity: string,
    employeeRemark: string): void {

    employeeFirstName = employeeFirstName.trim();
    employeeDob = employeeDob.trim();
    employeeTelephone = employeeTelephone.trim();
    employeeEmail = employeeEmail.trim();
    employeeCity = employeeCity.trim();
    employeeRemark = employeeRemark.trim();


    if (!employeeFirstName || !employeeFirstName || !employeeTelephone || !employeeEmail || !employeeCity || !employeeRemark) { this.messageSerivce.addMessage("Fill all blanks"); return };
    this.employeeService.addEmployee({
      firstName: employeeFirstName,
      lastName: employeeSecondName,
      dob: employeeDob,
      telephone: 1174582639,
      email: employeeEmail,
      maritalStatus: 1,
      city: 1,
      remark: employeeRemark
    } as Employee).subscribe(employee => {
      this.employees.push(employee);
    });
    this.messageSerivce.addMessage(`${employeeFirstName} Added`);
  }
}
