import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const headers = new HttpHeaders({
  
  
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  
  
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  

  API_KEY = '88e9d69ec17a4235a6c199706e098dff';

  

  constructor(private httpClient: HttpClient) { }

  getNews(){
    // return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`,
    return this.httpClient.get(`http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-06&sortBy=publishedAt&apiKey=88e9d69ec17a4235a6c199706e098dff`,
    {headers: headers}
    );
  }


}
