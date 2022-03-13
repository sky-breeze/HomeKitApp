import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationPage } from 'src/app/components/notification/notification.page';
import { AppRoutes } from 'src/app/constants/constant';
import { AddSensorPage } from '../add-sensor/add-sensor.page';
import { HttpPageService } from '../http-page.service';
const { App } = Plugins;



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  sensorList: any = []
  slidersArray = [
    {
      header: 'Scan Documents',
      imgSrc: './assets/slider/scan.png',
      content: 'Best QR scanners app for your smartphones. Only with mobile phones that support photo taking, you can quickly read the information'
    },
    {
      header: 'Appliance',
      imgSrc: './assets/slider/appliance.png',
      content: 'Latest Home Appliances for your home. Compare different brands and choose from a wide range of home appliance products at great offers'
    },
    {
      header: 'News Feed',
      imgSrc: './assets/slider/news.png',
      content: ' Latest and Breaking News on news feed. Explore news feed profile at Times of India for photos, videos and latest news of news feed.'
    },
  ]


  public alertShown: boolean = false;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public authService: AuthService,
    public router: Router,
    private httpPageService: HttpPageService

  ) {



  }

  ngOnInit() {
    console.log('calling')

    this.getSensors()
    console.log('this.router.url', this.router.url)
  }

  getSensors() {
    const reqBody = {
      "userUuid": localStorage.getItem('luUserUuid')
    }
    this.httpPageService.getSensors(reqBody).subscribe(res => {
      console.log('getSensors', res)
      if (res.data.length > 0) {
        this.sensorList = res.data;
      } else {
        this.sensorList = []
      }

    })
  }


  sliderimages = [
    { url: 'assets/logo.png' },
    { url: 'assets/logo.png' },
    { url: 'assets/logo.png' },
  ]


  openNotification() {
    this.presentModal()
  }
  doLogout() {
    this.presentLogoutAlertConfirm()
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }








  async presentLogoutAlertConfirm() {
    const alert = await this.alertController.create({

      header: 'HomeKit',
      message: 'Sure you want to logout ?',
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
          handler: () => {
            console.log('Confirm Okay');
            localStorage.clear();
            this.authService.logout()
            // this.authService.logout().then(()=>{
            //   this.router.navigateByUrl(AppRoutes.LOGIN);
            //   console.log('Reset Done Moving to Login Page');
            // },
            // ).catch((err)=>{
            //   console.log(err)
            // })
          }
        }
      ]
    });

    await alert.present();
  }

  async addSensorModal(applianceData: any) {
    const modal = await this.modalController.create({
      component: AddSensorPage,
      // componentProps: { 'applianceEditData': applianceData }
    });
    modal.onWillDismiss().then((dataReturned) => {
      console.log(dataReturned)
      console.log('ondismiss')
      this.getSensors()
      // if (dataReturned.data == 'success') {
      //   this.getUserAppliances(this.userCredentils.luUserUuid);
      // }

    })

    return await modal.present();
  }

  //date: {year: 2022, month: 3, day: 8}
  getDateInFormat(dateObj) {
    return new Date(dateObj.year, dateObj.month, dateObj.day)
  }

}
