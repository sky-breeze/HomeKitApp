import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommmonService {

  constructor(private loadingController: LoadingController) { }

  async loadingPresent(message: string = null, duration: number = null) {
    const loading = await this.loadingController.create({
      spinner:'bubbles', 
      message, 
      duration 
    });
    return await loading.present();
}

async loadingDismiss() {
    setTimeout(() => {
        return this.loadingController.dismiss();
    }, 1000);
}
}
