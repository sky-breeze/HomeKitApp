import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertController, IonRouterOutlet, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { StorageService } from './services/storage/storage.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthConstants } from './constants/AuthConstants';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // for storing the returned subscription
  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  userName: any
  phoneNumber: any
  public appPages = [
    {
      title: 'Home',

      url: '/tabs/home',
      icon: 'home'
    },
    // {
    //   title: 'Scan Document',
    //   url: '/tabs/scan-document',
    //   icon: 'scan-outline'
    // },
    // {
    //   title: 'Appliances',
    //   url: '/tabs/appliance',
    //   icon: 'bag-add-outline'
    // },
    {
      title: 'Performance',
      url: '/tabs/performance',
      icon: 'stats-chart-outline'
    },
    // {
    //   title: 'News',
    //   url: '/tabs/news-feed',
    //   icon: 'newspaper-outline'
    // },

    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'

    },
  ];


  userCredentils = {
    createdDate: "",
    email: "",
    isActive: "",
    luUserUuid: "",
    modifiedDate: "",
    passcode: "",
    phoneNumber: "",
    userName: "",
  }

  username: any = '';
  email: string = '';
  constructor(
    private platform: Platform,
    private router: Router,
    // private fireAuth : AngularFireAuth,
    private storageService: StorageService,
    public alertController: AlertController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService
  ) {
    console.log('app constructor called')
    this.userName = localStorage.getItem('userName')
    this.phoneNumber = localStorage.getItem('phoneNumber')
    this.initializeApp();
    this.initializeApp1()
    // const data = this.storageService.get(AuthConstants.AUTH).then(res=>{
    //   console.log('res===>',res)
    //   this.userCredentils = res[0];
    // } 
    // )
    // this.auth.userData$.subscribe((res: any) => {
    //   console.log('this.auth.userDat==>', res)
    //   // this.userCredentils = res[0];
    //   this.username = res[0].userName;
    //   console.log(this.username)
    // });

  }

  initializeApp1() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.backButtonEvent();
      // this.splashScreen.hide();
    });
  }


  backButtonEvent() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/auth/login" ||
          this.router.url === "/tabs/home" ||
          this.router.url === "/tabs/scan-document" ||
          this.router.url === "/tabs/news-feed" ||
          this.router.url === "/tabs/appliance"
        ) {
          this.presentExitAlertConfirm();
        }
      });
    });
  }

  async initializeApp(): Promise<void> {
    return await this.platform.ready().then(() => {
      // debugger;


    });


    //   Plugins.Device.getInfo().then((deviceInfo) => {
    //     if (deviceInfo.platform !== 'web') {
    //         Plugins.SplashScreen.hide();
    //         Plugins.StatusBar.show();
    //     }
    // });

    // this.authService.authState.subscribe(state=>{
    //   if(state){
    //     console.log('app constructor called==>',state)
    //     this.router.navigateByUrl(AppRoutes.SCAN)
    //   }else{
    //     console.log('app constructor called===>',state)
    //     this.router.navigateByUrl(AppRoutes.LOGIN)
    //   }
    // }
    // );

  }
  async presentExitAlertConfirm() {
    const alert = await this.alertController.create({

      header: 'HomeKit',
      message: 'Sure you want to exit ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Okay',
          cssClass: 'success',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();

          }
        }
      ]
    });

    await alert.present();
  }


}






