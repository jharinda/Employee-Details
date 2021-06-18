import { CityService } from './../../shared/city.service';
import { Component, OnInit } from '@angular/core';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  cities: any;

  constructor(private cityservice: CityService) { }

  ngOnInit(): void {
    //this.cityservice.getCities();
    this.getCities();
  }

  getCities() {
    this.cityservice.getCities().subscribe(res => this.cities = res);
  }

  deleteCity(id: number) {
    this.cityservice.deleteCity(id).subscribe(res => {
      console.log("deleted ", id);
      this.getCities();
    }, err => console.log("Delete Fail ", id));
  }
  editCity(id: number) {
    console.log(id);
  }



}
