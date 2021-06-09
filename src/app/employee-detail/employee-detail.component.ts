import { EmployeeService } from './../employee.service';
import { Employee } from './../employee';
import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
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

  getEmployee() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee)
  }

  goBack(): void {
    this.location.back();
  }

  update(): void {
    if (this.employee) {
      this.employeeService.updateEmployee(this.employee).subscribe(() => this.goBack());

    }


  }



}
