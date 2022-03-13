import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  // 'Authorization': this.basic
});
let options = { headers: headers }
@Injectable({
  providedIn: 'root'
})
export class HttpPageService {

  constructor(private http: HttpClient) { }

  saveSensor(postData: any): Observable<any> {
    return this.http.post(environment.baseURL + 'saveUserSensor', postData, options)
  }
  getSensors(postData: any): Observable<any> {
    return this.http.post(environment.baseURL + 'getUserSensors', postData, options)
  }

  getSensorsDetails(postData: any): Observable<any> {
    return this.http.post(environment.baseURL + 'getSensorDetails', postData, options)
  }
}
