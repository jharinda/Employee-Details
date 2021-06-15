import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
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

  isUpdate: boolean = false;

  cities?: any;
  employees: Employee[] = [];

  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dob: '',
    telephone: 0,
    email: '',
    maritalStatus: -1,
    city: 0,
    remark: ''
  };

  constructor(
    private employeeService: EmployeeService,
    public messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    this.getAllEmployees();
    this.getEmployee(this.getRouteId());

  }

  getRouteId() { return (Number(this.route.snapshot.paramMap.get('id'))); }

  goBack() { this.location.back(); }

  getAllEmployees() { this.employeeService.getEmployees().subscribe(employees => this.employees = employees); }

  getAllCities() { this.employeeService.getAllCities().subscribe(city => this.cities = city); }

  getCityName(id: any) {
    for (let i = 0; i < this.cities.length; i++)
      if (this.cities[i].cityId == id) return this.cities[i].cityName;
  }

  getEmployee(id: number) {
    if (this.getRouteId()) {
      this.employeeService.getEmployee(id).subscribe(employee => {
        this.employee = employee[0];
        this.employee.dob = this.employee.dob.split("T")[0];
        this.employee.id = id;
        this.isUpdate = true;
      })
    }

  }

  delete() {
    this.employeeService.deleteEmployee(this.getRouteId()).subscribe(
      res => {
        this.messageService.addMessage("Deleted");
        this.getAllEmployees();
        this.location.go('/detail/');
      },
      err => {
        console.log(err);
        this.getAllEmployees();
        this.messageService.addMessage("Error");

      })
  }

  add(employeeFirstName: string, employeeSecondName: string, employeeDob: string, employeeTelephone: string, employeeEmail: string, employeeMaritalStatus: string, employeeCity: string, employeeRemark: string): void {

    this.employee.firstName = employeeFirstName.trim();
    this.employee.lastName = employeeSecondName.trim();
    this.employee.dob = employeeDob.trim();
    this.employee.telephone = Number(employeeTelephone.trim());
    this.employee.email = employeeEmail.trim();
    this.employee.city = Number(employeeCity);
    this.employee.maritalStatus = Number(employeeMaritalStatus);
    this.employee.remark = employeeRemark.trim();

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //NO EMPTY SPACE
    if (!this.employee.firstName || !this.employee.lastName || !this.employee.dob || !this.employee.telephone || !this.employee.telephone || !this.employee.email) { this.messageService.addMessage("Fill all blanks"); return };

    //INVALID EMAIL
    if (!re.test(String(employeeEmail).toLowerCase())) { this.messageService.addMessage("Invaild Email"); return; }

    //MARITAL STATUS
    if (this.employee.maritalStatus <= -1) { this.messageService.addMessage("Select marital Status"); return; }

    //CITY
    if (this.employee.city <= 0) { this.messageService.addMessage("Select a City"); return; }
    this.getRouteId() ? this.updateEmployee() : this.registerEmployee();

  }

  updateEmployee() {
    this.employee.id = this.getRouteId();
    this.employeeService.updateEmployee(this.employee, this.employee.id).subscribe(res => {
      this.messageService.addMessage(`${this.employee.firstName} Updated`);
      this.getAllEmployees();
    }, err => { console.log(err) })
  }

  registerEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(employee => {
      this.employees.push(employee);
      this.getAllEmployees();
      this.messageService.addMessage(`${this.employee.firstName} Added`);
    },
      err => {
        this.messageService.addMessage('Error occured');
        console.log(err)
      });
  }
}
