import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { HttpPageService } from '../http-page.service';



@Component({
  selector: 'app-performance',
  templateUrl: './performance.page.html',
  styleUrls: ['./performance.page.scss'],
})
export class PerformancePage {
  date: any
  sensorDetails: any
  count = 0;
  searchForm: FormGroup;
  sensorList: any = [];
  showGauage: boolean;
  public canvasWidth = 300
  public needleValue = 0
  public centralLabel = ''
  public name = ''
  public bottomLabel = '0'
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['#e71837 ', '#ffcccb', '#ffff00 ', '#a5d610', '#49b675'],
    arcDelimiters: [30, 40, 50, 75],
    rangeLabel: ['0', '2000'],
    needleStartValue: 0,

  }

  constructor(private httpPageService: HttpPageService) {

    // this.needleValue = Math.floor(Math.random() * 100) + 1;
    // setInterval(this.callme, 1000);
    // interval(1000).subscribe((x => {
    //   this.callme();
    // }));
    this.getSensors()

    this.searchForm = new FormGroup({
      sensor: new FormControl('', [Validators.required,]),
      date: new FormControl(new Date("2022-01-17").toISOString(), [Validators.required,]),
    })

    // this.getSensorsDetails()

  }

  callme() {
    // console.log('count-', this.count)
    // this.count = this.count + 1
    // const randomValue = Math.floor(Math.random() * 100) + 1;
    // this.needleValue = randomValue
    // this.bottomLabel = `${randomValue}`
    this.name = 'CO2 SCD'
    // console.log(this.sensorDetails.co2Scd / 20)
    this.needleValue = this.sensorDetails.co2Scd / 20
    this.bottomLabel = this.sensorDetails.co2Scd
  }

  getSensorsDetails(sensorUuid, dateValue) {
    const requestBody = {
      "reportDate": dateValue,
      "userSensorUuid": sensorUuid
    }
    this.httpPageService.getSensorsDetails(requestBody).subscribe((res: any) => {
      console.log('getSensorsDetails', res)
      if (res.hasOwnProperty('data')) {
        this.showGauage = true;
        this.sensorDetails = res.data
        this.callme()
      } else {
        this.showGauage = false;
        // this.sensorList = []
      }

    })
  }

  onIonChange(value) {
    console.log(this.searchForm.get('sensor').value)
    console.log(this.searchForm.get('date').value)
    const sensorUuid = this.searchForm.get('sensor').value
    const sensorDate = new Date(this.searchForm.get('date').value).toISOString().slice(0, 10)

    this.getSensorsDetails(sensorUuid, sensorDate)

  }

  getSensors() {
    const reqBody = {
      "userUuid": localStorage.getItem('luUserUuid')
    }
    this.httpPageService.getSensors(reqBody).subscribe(res => {
      console.log('getSensors', res)
      if (res.data.length > 0) {
        this.sensorList = res.data;
        this.searchForm.patchValue({
          sensor: this.sensorList[0].userSensorUuid
        })
        this.getSensorsDetails(this.sensorList[0].userSensorUuid, '2022-01-17')
      } else {
        this.sensorList = []
      }

    })
  }

}
