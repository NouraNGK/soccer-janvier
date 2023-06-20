import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl: string = "http://localhost:3000/api/weather"
  constructor(private http: HttpClient) { }

  search(city: string){
    return this.http.get<{ cityWeather: any }>(`${this.weatherUrl}/${city}`);
  }
}
