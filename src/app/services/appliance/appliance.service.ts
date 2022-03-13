import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appliance } from 'src/app/interface/appliance';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {

  private readonly _appliances: BehaviorSubject<Appliance[]>;

  constructor(private httpService: HttpService,) {
    this._appliances = new BehaviorSubject<Appliance[]>(null);
   }


   async getAppliances(): Promise<Appliance[]> {
    return this._appliances.getValue();
}

async setAppliances(expenses: Appliance[]): Promise<void> {
    
    return this._appliances.next(expenses);
}

getAppliancesSubscription(): BehaviorSubject<Appliance[]> {
    return this._appliances;
}


getApplianceList(): Observable<any> {
  return this.httpService.get('getApplianceList');
  }

saveUserAppliaces(postData: any): Observable<any> {
    return this.httpService.post('saveUserAppliaces', postData);
  }

  getAppliacesByUser(user_uuid:string): Observable<any> {
    return this.httpService.get(`getAppliacesByUser/${user_uuid}`);
  }

  getUserAppliacesById(appliance_uuid:string): Observable<any> {
    return this.httpService.get(`getUserAppliacesById/${appliance_uuid}`);
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }
}
