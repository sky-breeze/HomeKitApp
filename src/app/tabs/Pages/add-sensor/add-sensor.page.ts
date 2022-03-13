import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { HttpPageService } from '../http-page.service';



@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.page.html',
  styleUrls: ['./add-sensor.page.scss'],
})
export class AddSensorPage implements OnInit {
  sensorForm: FormGroup;
  luUserUuid: any

  constructor(private modalController: ModalController, private httpService: HttpPageService,
    private toastService: ToastService) {
    this.luUserUuid = localStorage.getItem('luUserUuid')
    this.sensorForm = new FormGroup({
      sensorName: new FormControl('', [Validators.required,]),
      // userUuid: new FormControl(this.luUserUuid, [Validators.required,]),
      userAssingedSensorName: new FormControl('', [Validators.required,]),

    })
  }

  ngOnInit() {
  }

  dismissModal(): void {
    this.modalController.dismiss();
  }

  saveSensorForm() {
    console.log(this.sensorForm.value);
    // const reqData = JSON.stringify(this.sensorForm.value)
    const sensorName = this.sensorForm.get('sensorName').value
    const userAssingedSensorName = this.sensorForm.get('userAssingedSensorName').value
    const reqData = { "sensorName": sensorName, "userUuid": this.luUserUuid, "userAssingedSensorName": userAssingedSensorName }
    console.log('reqData', reqData)
    this.httpService.saveSensor(reqData).subscribe(data => {
      console.log('saveSensor', data)
      if (data.statusCode == 0) {
        this.toastService.presentToast('data.message', 'red');
        alert(data.message)
      } else {
        this.toastService.presentToast('data.message', 'green');
        alert(data.message)
      }
    })


  }

}
