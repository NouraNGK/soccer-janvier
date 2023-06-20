import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weatherForm: FormGroup;
  findedWeather: any;
  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ["", [Validators.required]]
    })
  }

  searchWeather() {
    console.log("here city", this.weatherForm.value);
    this.weatherService.search(this.weatherForm.value.city).subscribe(
      (response) => {
        console.log("Here response from BE", response.cityWeather);
        this.findedWeather = response.cityWeather;
      });
  }
}
