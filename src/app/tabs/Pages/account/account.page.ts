import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NotificationPage } from 'src/app/components/notification/notification.page';
import { AuthConstants } from 'src/app/constants/AuthConstants';
import { AppRoutes } from 'src/app/constants/constant';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userCredentils: any;
  userName: any;
  phoneNumber: any;
  constructor(
    private router: Router,
    public modalController: ModalController,
    public alertController: AlertController,
    public authService: AuthService,

    private storageService: StorageService,
  ) {
    // this.storageService.get(AuthConstants.AUTH).then(res=>{
    //   console.log('res===>',res)
    //   this.userCredentils = res[0];
    // });

    this.authService.userData$.subscribe((res: any) => {
      console.log('this.auth.userDat==>', res)
    });

  }

  ngOnInit() {

    this.userName = localStorage.getItem('userName')
    this.phoneNumber = localStorage.getItem('phoneNumber')
    console.log('userName', this.userName)




  }

  redirectToLogin() {
    this.router.navigateByUrl("/auth/login");
  }

  openNotification() {
    this.presentModal()
  }
  doLogout() {
    this.presentAlertConfirm()
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  async presentAlertConfirm() {
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
            this.authService.logout();
            //   this.authService.logout().then(() => {
            //     this.router.navigateByUrl(AppRoutes.LOGIN);
            //     console.log('Reset Done Moving to Login Page');
            //     const errorMsg = "You are Successfully Logged out !"
            //     // this.toastService.presentToast(errorMsg,'success');
            // }, error => console.log(error));
          }
        }
      ]
    });

    await alert.present();
  }



}
