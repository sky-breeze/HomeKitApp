import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from 'src/app/constants/AuthConstants';
import { AppRoutes } from 'src/app/constants/constant';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(public storageService: StorageService, private authService: AuthService, public router: Router) {
    console.log('HomeGuard constructor')
  }
  canActivate(): boolean {
    console.log("yooo")
    if (localStorage.getItem('luUserUuid')) {
      return true;
    } else {
      this.authService.logout()
      return false;
    }

  }

}
