import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

post(serviceName: string, data: any) {
const headers = new HttpHeaders({"Content-Type":"application/json"});
const options = { headers: headers, withCredintials: false };
const url = environment.apiUrl + serviceName;

return this.http.post(url, JSON.stringify(data), options);
}

get(serviceName: string) {
  const headers = new HttpHeaders({"Content-Type":"application/json"});
  const options = { headers: headers, withCredintials: false };
  const url = environment.apiUrl + serviceName;
  
  return this.http.get(url);
  }
}
