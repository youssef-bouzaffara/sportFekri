import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  searchWeatherForm: FormGroup;

  
  iconPath: string;
  sr: any;
  ss: any;
  
  weatherResult: any;


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.searchWeatherForm = this.formBuilder.group({
      city: ["", [Validators.required]]
    });
  }

  search() {
    console.log("here city searched :", this.searchWeatherForm);

    this.weatherService.searchWeather(this.searchWeatherForm.value).subscribe(
      (resp) => {
        console.log("here response recupérée :", resp);
        this.weatherResult = resp.result;
        this.sr = new Date(resp.result.sunriseTime * 1000);
        this.ss = new Date(resp.result.sunsetTime * 1000);
        this.iconPath = "https://openweathermap.org/img/wn/" + resp.result.icon + ".png";

      }
    );
  }

}
