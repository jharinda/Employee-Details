import { EmployeeService } from './../employee.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from './../employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee?: Employee;


  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee)
  }

  goBack(): void {
    this.location.back();
  }

  empMarital(status: string): Boolean {
    if (status === 'ture') { return true }
    return false;
  }
  update(employeeFirstName: string,
    employeeSecondName: string,
    employeeDob: string,
    employeeTelephone: string,
    employeeEmail: string,
    employeeMaritalStatus: string,
    employeeCity: string,
    employeeRemark: string): void {
    if (this.employee) {

      this.employee.firstName = employeeFirstName;
      this.employee.lastName = employeeSecondName;
      this.employee.dob = employeeDob;
      this.employee.telephone = Number(employeeTelephone);
      this.employee.email = employeeEmail;
      this.employee.maritalStatus = Boolean(employeeMaritalStatus);
      this.employee.city = Number(employeeCity);
      this.employee.remark = employeeRemark;

      console.log();

      this.employeeService.updateEmployee(this.employee).subscribe(() => this.goBack());
    }
  }
}
