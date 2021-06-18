import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { CitiesComponent } from './cities/cities.component';
import { CityListComponent } from './cities/city-list/city-list.component';
import { CityDetailComponent } from './cities/city-detail/city-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DashboardComponent,
    MessageComponent,
    NewEmployeeComponent,
    CitiesComponent,
    CityListComponent,
    CityDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
