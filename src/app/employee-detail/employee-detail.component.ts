import { MessageService } from './../message.service';
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

  //@Input() 
  employee?: Employee;
  cities?: any;


  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getAllCities();
  }

  getAllCities() {
    this.employeeService.getAllCities().subscribe(city => this.cities = city);
  }

  getEmployee(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee[0])


  }

  goBack(): void {
    this.location.back();
  }

  empMarital(status: string): Boolean {
    if (status === 'ture') { return true }
    return false;
  }

  delete() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.deleteEmployee(id).subscribe(() => this.goBack());
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
      this.employee.firstName = employeeFirstName.trim();
      this.employee.lastName = employeeSecondName.trim();
      this.employee.dob = employeeDob.trim();
      this.employee.telephone = Number(employeeTelephone.trim());
      this.employee.email = employeeEmail.trim();
      this.employee.maritalStatus = Number(employeeMaritalStatus.trim());
      this.employee.city = Number(employeeCity.trim());
      this.employee.remark = employeeRemark.trim();
      let id = Number(this.route.snapshot.paramMap.get('id'));

      if (!this.employee.firstName ||
        !this.employee.lastName ||
        !this.employee.dob ||
        !this.employee.telephone ||
        !this.employee.email ||
        !this.employee.maritalStatus ||
        !this.employee.city ||
        !this.employee.remark) { this.messageService.addMessage("Fill all blanks"); return; }



      if (this.employee.maritalStatus == -1) {
        this.messageService.addMessage("Enter Marital Status");
        return;
      }

      this.employeeService.updateEmployee(this.employee, id).subscribe(() => {
        setTimeout(() => { this.messageService.addMessage("Updated"); this.goBack(); }, 300);
      });
    }
  }
}
