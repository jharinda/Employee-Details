import { Employee } from './../employee';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee?: Employee;


  constructor() { }

  ngOnInit(): void {
  }

  onSelect(employee: Employee) {
    console.log(`${employee.id} clicked`);

  }



}
