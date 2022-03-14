import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpService } from "src/app/services/http.service";
import { StorageService } from "src/app/services/storage/storage.service";
import { Router } from "@angular/router";
import { AuthConstants } from "src/app/constants/AuthConstants";
import { AppRoutes } from "src/app/constants/constant";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  authState = new BehaviorSubject(false);

  private currentUserStatus: boolean;
  collectionName = 'users';
  userData$ = new BehaviorSubject<any>([]);

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private http: HttpClient

  ) {
    console.log('constructor AuthService')
    // this.platform.ready().then(() => {
    //   // this.ifLoggedIn();
    // });
  }



  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }


  login(postData: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(environment.baseURL + 'login', postData)
  }


  // getColumnData() {
  //   const requestBody = {
  //     "excelId": "1002"
  //   }
  //   const headers = { 'content-type': 'application/json' }
  //   return this.http.post('https://surecollect.ai:9003/getDbColumns', requestBody,)

  // }

  signup(postData: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(environment.baseURL + 'register', postData)
  }

  logout() {
    this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.userData$.next('');
      this.router.navigate([AppRoutes.LOGIN]);
    });
  }





}
