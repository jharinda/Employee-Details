import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const employees = [
      {
        id: 1,
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
        city: 4,
        remark: "remark"
      }, {
        id: 4,
        firstName: "Finith",
        lastName: "John",
        dob: "10/01/1999",
        telephone: 1342057215,
        email: "jaanit@gmail.com",
        maritalStatus: true,
        city: 4,
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
        city: 5,
        remark: "remark"
      }
    ]
    return { employees }
  }

  genId(employee: Employee[]): number {
    return employee.length > 0 ? Math.max(...employee.map(employee => employee.id)) + 1 : 11;
  }
}
