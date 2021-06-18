import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  currentCity: any;
  hello: any = "mm";
  readonly CITYAPI = "http://localhost:5000/api/city"

  constructor(private http: HttpClient) {
    this.getCities();
  }

  getCities() {
    return this.http.get<any>(this.CITYAPI);
  }

  deleteCity(id: number) {
    return this.http.delete(`${this.CITYAPI}/${id}`);
  }

  getCity(id: number) {
    return this.currentCity = this.http.get<any[]>(`${this.CITYAPI}/${id}`);
  }

  addCity(newCity: string) {
    return this.http.post(`${this.CITYAPI}`, newCity);
  }

  updateCity(id: number, currentCity: string) {
    return this.http.put(`${this.CITYAPI}/${id}`, currentCity, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
