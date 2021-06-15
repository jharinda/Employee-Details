import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { EmployeesComponent } from './employees/employees.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  // { path: 'detail', component: EmployeeDetailComponent },
  //{ path: 'detail/:id', component: EmployeeDetailComponent },
  { path: 'detail', component: NewEmployeeComponent },
  { path: 'detail/:id', component: NewEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
