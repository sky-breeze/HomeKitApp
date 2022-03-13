import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';

import { AppRoutes, StorageKeys } from 'src/app/constants/constant';
import { StorageService } from 'src/app/services/storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storageService : StorageService,
    private router : Router
    ){
    console.log('started--------')
  }
  canActivate() {
    
    // return this.authservice.isAuthenticated();
    return this.storageService.getFromLocalStorage(StorageKeys.ACTIVE_USER).then((response) => {
      if (response !== null && response === true) {
          return true;
      } else {
          this.router.navigateByUrl(AppRoutes.AUTH);
      }
  });
  }
  
}
