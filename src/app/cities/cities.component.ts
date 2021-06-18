import { Location } from '@angular/common';
import { MessageService } from './../message.service';
import { ActivatedRoute } from '@angular/router';
import { CityService } from './../shared/city.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {


  isUpdate: boolean = false;
  currentCity?: any = '';

  cities: any;

  constructor(
    private cityservice: CityService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public location: Location,
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.checkUpdate();


  }

  checkUpdate() {
    if (this.getRouterId()) {
      this.isUpdate = true;
      this.getCity(this.getRouterId())
    }
    else { this.isUpdate = false };
  }

  getRouterId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  getCity(id: number) {
    this.cityservice.getCity(id).subscribe(city => {
      this.currentCity = city;
      this.currentCity = this.currentCity[0];
    }, err => console.log(err))
  }

  updateCity(form: NgForm) {
    this.cityservice.updateCity(this.getRouterId(), form.value).subscribe(res => {
      this.messageService.addMessage("Updated");
      this.getCities()
    }, err => console.log(err)
    );
  }


  getCities() {
    this.cityservice.getCities().subscribe(res => this.cities = res);
  }

  deleteCity(id: number) {
    this.cityservice.deleteCity(id).subscribe(res => {
      console.log("deleted ", id);
      this.messageService.addMessage("Deleted")
      this.getCities();
    }, err => {
      this.messageService.addMessage(err);
      console.log("Delete Fail ", id)
    });
  }

  editCity(id: number) {

    if (id) { this.getCity(id); this.isUpdate = true }
  }

  addCity(form: NgForm) {
    this.cityservice.addCity(form.value).subscribe(res => {
      this.messageService.addMessage("City Added");
      this.getCities();
    }, err => {
      this.messageService.addMessage("Error");
      console.error(err)
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.value.cityName);

    if (this.getRouterId()) {
      this.updateCity(form);
    }
    else {
      this.addCity(form);
    }

  }




}
