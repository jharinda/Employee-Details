import { ActivatedRoute } from '@angular/router';
import { CityService } from './../../shared/city.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  isUpdate: boolean = false;
  currentCity?: any;

  constructor(private cityservice: CityService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getRouterId() ? this.isUpdate = true : this.isUpdate = false;
    console.log(this.isUpdate)

    setInterval(() => {
      this.getCity();

    }, 200)

  }

  getRouterId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  getCity() {
    this.cityservice.getCity(this.getRouterId()).subscribe(city => {
      this.currentCity = city;
      this.currentCity = this.currentCity[0];
    }, err => console.log(err))
  }

  updateCity() {
    // this.cityservice.updateCity(this.getRouterId,)
  }





}
