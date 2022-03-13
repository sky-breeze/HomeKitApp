import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { SubscriptionLike } from 'rxjs';
import { ApplianceService } from 'src/app/services/appliance/appliance.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AddAppliancePage } from '../add-appliance/add-appliance.page';
import { CommmonService } from 'src/app/services/shared/commmon.service';
import { AuthConstants } from 'src/app/constants/AuthConstants';

@Component({
  selector: 'app-appliance',
  templateUrl: './appliance.page.html',
  styleUrls: ['./appliance.page.scss'],
})
export class AppliancePage implements OnInit, OnDestroy {

  subscription: SubscriptionLike;

  userCredentils: any;
  appliances: any = [];


  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public applianceService: ApplianceService,
    public storageService: StorageService,
    public router: Router,
    private commonService: CommmonService

  ) {

    console.log('constructor called.....')
    this.storageService.get(AuthConstants.AUTH).then(res => {
      console.log('res===>', res)
      this.userCredentils = res[0];
      console.log(this.userCredentils.luUserUuid)
      this.getUserAppliances(this.userCredentils.luUserUuid);
    });
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy")





  }

  ngOnInit() {
    // this.getUserAppliances(this.userCredentils.luUserUuid);

  }

  getUserAppliances(user_uuid: string) {
    this.applianceService.getAppliacesByUser(user_uuid).subscribe(res => {
      console.log('getUserAppliances', res)
      if (res.statusCode == 1) {
        this.appliances = res.data;
      }
    });

  }




  deleteAppliance(applianceId) {
    console.log('deleteAppliance applianceId===>', applianceId)
    this.presentAlertConfirm(applianceId);
  }




  async presentAlertConfirm(index) {
    const alert = await this.alertController.create({

      header: 'Appliance',
      message: 'Sure you want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');

          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            // this.removeAppliance(index);
          }
        }
      ]
    });

    await alert.present();
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: AddAppliancePage
    });
    modal.onWillDismiss().then((dataReturned) => {
      console.log(dataReturned)
      this.getUserAppliances(this.userCredentils.luUserUuid);
    })

    return await modal.present();
  }

  async editApplianceModal(applianceData: any) {
    const modal = await this.modalController.create({
      component: AddAppliancePage,
      componentProps: { 'applianceEditData': applianceData }
    });
    modal.onWillDismiss().then((dataReturned) => {
      console.log(dataReturned)
      if (dataReturned.data == 'success') {
        this.getUserAppliances(this.userCredentils.luUserUuid);
      }

    })

    return await modal.present();
  }



  // async editApplianceModal(appliance:Appliance){
  //   const modal = await this.modalController.create({
  //     component: AddAppliancePage,
  //     componentProps: {
  //       id: appliance.id,
  //       applianceName: appliance.applianceName,
  //       unit: appliance.unit,
  //       unitPrice: appliance.unitPrice
  //     }
  // });
  // return await modal.present();

  // }

  // editApplianceModal(appliance:any){
  //   console.log('editApplianceModal===>',appliance);
  //   // this.router.navigate([AppRoutes.EDITAPPLIANCE,appliance])
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: appliance
  // };
  // this.router.navigate(['/tabs/add-appliance'], navigationExtras);

  // }

}
