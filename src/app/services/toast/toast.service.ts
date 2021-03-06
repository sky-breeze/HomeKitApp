import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {}

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      color: color,
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
