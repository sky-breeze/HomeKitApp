import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, ModalController, NavParams } from "@ionic/angular";
import { AuthConstants } from "src/app/constants/AuthConstants";
import { AppRoutes } from "src/app/constants/constant";
import { Appliance } from "src/app/interface/appliance";
import { ApplianceClass } from "src/app/interface/ApplianceData";
import { ApplianceService } from "src/app/services/appliance/appliance.service";
import { AddApplianceService } from "src/app/services/storage/add-appliance.service";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-add-appliance",
  templateUrl: "./add-appliance.page.html",
  styleUrls: ["./add-appliance.page.scss"],
})
export class AddAppliancePage implements OnInit {
 

  customActionSheetOptions: any = {
    header: 'Appliances',
    
  };
  
  @Input() applianceEditData: string;
  

  appliance: any;
  showUpdateButton: boolean = false;
  applianceId: string;
  applianceList:any = [];
  buttonName: string = "Add";
  userCredentials:any;

  alertMes: string = "";
  appliances = ["AC", "TV", "Fan", "Washing Machine", "Cooler", "Lights"];
  applianceData = {
    "fkUserUuid": '',
    "fkApplianceMasterUuid": '',
    "usageKwh": '',
    "hoursPerDay": '',
    "quantity": ''
  }
  applianceDataset:any
  addApplianceForm : FormGroup;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private addApplianceService: AddApplianceService,
    private router: Router,
    private route: ActivatedRoute,
    private applianceService: ApplianceService,
    private storageService: StorageService,
    private navParams: NavParams
    
  ) {
     this.applianceDataset  = navParams.get('applianceEditData');
    console.log('applianceEditData',this.applianceDataset)
    // const objLength = Object.keys(applianceData).length;
    // console.log(objLength);
    if(this.applianceDataset){
      this.getUserApplianceById(this.applianceDataset)
    }
    
    this.addApplianceForm = new FormGroup({
      applianceName: new FormControl("", Validators.required),
      usage: new FormControl("", Validators.required),
      hoursPerDay: new FormControl("", Validators.required),
      quantity: new FormControl("", Validators.required),
      // yearlyUsage: new FormControl("", Validators.required),
    });
    this.getAppliances()
    this.storageService.get(AuthConstants.AUTH).then(res=>{
      console.log('res===>',res)
      this.userCredentials = res[0];
    } 
    )

    this.route.queryParams.subscribe(params => {
      console.log('params',params)
      console.log('params',Object.keys(params).length)
      const objLength = Object.keys(params).length;
      if(objLength>0){
        // alert('edit')
        this.getUserApplianceById(params)
      }else{
        // this.addApplianceForm = new FormGroup({
        //   usage: new FormControl("", Validators.required),
        //   applianceName: new FormControl("", Validators.required),
        //   hoursPerDay: new FormControl("", Validators.required),
        //   quantity: new FormControl("", Validators.required),
        //   // yearlyUsage: new FormControl("", Validators.required),
        // });
        this.addApplianceForm.reset();
        this.buttonName = "ADD";
      }
  });
  }

  ngOnInit() {
    
  }


  getUserApplianceById(appliance: any) {
    this.applianceService.getUserAppliacesById(appliance.userAppliancesUuid).subscribe((doc) => {
      console.log("getUserApplianceById======>>>>>", doc.data[0]);
      this.showUpdateButton = true;
      this.buttonName = "Update";
      console.log(this.showUpdateButton);
      this.appliance = doc.data[0];
      console.log(this.appliance);
      // this.applianceId = applianceId;
      this.editAppliance(this.appliance);
    });
  }
   
  editAppliance(appliance: any) {
    this.addApplianceForm.patchValue({
      applianceName: appliance.fkApplianceMasterUuid,
      usage: appliance.usageKwh,
      hoursPerDay: appliance.hoursPerDay,
      quantity: appliance.quantity,
      
    });
  }

 
  updateAppliance() {
    // const applianceData:any  = navParams.get('applianceEditData');
    console.log('applianceEditData',this.applianceDataset)
    console.log('updateAppliance',this.addApplianceForm.value)
    this.dismissModal('success');
  }

  initCreateAppliance() {
    // const appliance: ApplianceClass = this.addApplianceForm.value; 
    this.applianceData.fkApplianceMasterUuid = this.addApplianceForm.value.applianceName
    this.applianceData.fkUserUuid = this.userCredentials.luUserUuid
    this.applianceData.hoursPerDay = this.addApplianceForm.value.hoursPerDay
    this.applianceData.usageKwh = this.addApplianceForm.value.usage
    this.applianceData.quantity = this.addApplianceForm.value.quantity
    
    console.log(this.applianceData);

    if (!this.addApplianceForm.valid) {
      return false;
    } else {
      this.applianceService.saveUserAppliaces(this.applianceData).subscribe(res=>{
        console.log(res)
        if(res.statusCode==1){
          console.log("Appliance saved successfully!!!!!", res);
          this.addApplianceForm.reset();
          // this.router.navigateByUrl(AppRoutes.APPLIANCE);
          this.dismissModal('success');
        }else{
          console.log(res)
          this.dismissModal('failed');
        }
      })
      // this.firebaseService
      //   .createAppliance(appliance)
      //   .then((res) => {
      //     console.log("Appliance saved successfully!!!!!", res);
      //     this.addApplianceForm.reset();
      //     this.router.navigateByUrl(AppRoutes.APPLIANCE);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }



  dismissModal(status:string): void {
    this.modalController.dismiss(status);
  }

  showInformation(msg: string) {
    console.log("clicked");
    if (msg === "appliance") {
      this.alertMes = "Select your appliances";
    }
    if (msg === "kg/wt") {
      this.alertMes = "add your Kg/wt";
    }
    if (msg === "unit") {
      this.alertMes = "per unit price";
    }
    this.presentAlert(this.alertMes);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }

  getAppliances(){
    this.applianceService.getApplianceList().subscribe(res=>{
      console.log('getAppliances',res.data)
      this.applianceList = res.data
    })
  }
}
