import { Employee } from './employee';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const employees = [
      {
        id: 3,
        firstName: "Jane",
        lastName: "John",
        dob: "10/01/1999",
        telephone: 1342057215,
        email: "jaanit@gmail.com",
        maritalStatus: true,
        city: 1,
        remark: "remark"
      },
      {
        id: 2,
        firstName: "Janith",
        lastName: "Maa Maa",
        dob: "10/01/1998",
        telephone: 1342057215,
        email: "jaansdfit@gmail.com",
        maritalStatus: true,
        city: 2,
        remark: "rk"
      },
      {
        id: 3,
        firstName: "Jonith",
        lastName: "John",
        dob: "10/01/1999",
        telephone: 1234567890,
        email: "jaanit@gmail.com",
        maritalStatus: false,
        city: 2,
        remark: "remark"
      }, {
        id: 4,
        firstName: "Finith",
        lastName: "John",
        dob: "10/01/1999",
        telephone: 1342057215,
        email: "jaanit@gmail.com",
        maritalStatus: true,
        city: 1,
        remark: "remark"
      }
      , {
        id: 5,
        firstName: "Ginith",
        lastName: "John",
        dob: "10/01/1999",
        telephone: 1342057215,
        email: "jaanit@gmail.com",
        maritalStatus: true,
        city: 1,
        remark: "remark"
      }
    ]
    return { employees }
  }

  genId(employees: Employee[]) {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}
