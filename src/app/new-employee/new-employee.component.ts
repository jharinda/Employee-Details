import { Location } from '@angular/common';
import { EmployeeService } from './../employee.service';
import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from './../employee';



@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  selectedEmployee?: Employee;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    public messageService: MessageService,
    private location: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
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


    if (!employeeFirstName || !employeeFirstName || !employeeTelephone || !employeeEmail || !employeeCity || !employeeRemark) { this.messageService.addMessage("Fill all blanks"); return };

    this.employeeService.addEmployee({
      firstName: employeeFirstName,
      lastName: employeeSecondName,
      dob: employeeDob,
      telephone: Number(employeeTelephone),
      email: employeeEmail,
      maritalStatus: Boolean(employeeMaritalStatus),
      city: Number(employeeCity),
      remark: employeeRemark
    } as Employee).subscribe(employee => {
      this.employees.push(employee);
    });
    this.messageService.addMessage(`${employeeFirstName} Added`);
  }

}
