import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthConstants } from "src/app/constants/AuthConstants";
import { AppRoutes } from 'src/app/constants/constant';
import { userInterface } from 'src/app/interface/user';
import { StorageService } from "src/app/services/storage/storage.service";
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from '../../services/auth.service';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get("password");
  const passwordConfirm = control.parent.get("passwordConfirm");

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === "") {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  postData = {
    userName: '',
    phoneNumber: '',
    email: '',
    passcode: '',
    pincode: '',
    address: '',
    wifiName: '',
    wifiPassword: ''
  };
  showPassword = false;

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    phonenumber: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.min(8)]),
    passwordConfirm: new FormControl("", [
      Validators.required,
      Validators.min(8),
      confirmPasswordValidator,
    ]),
    pincode: new FormControl("",),
    address: new FormControl("",),
    wifiName: new FormControl("",),
    wifiPassword: new FormControl("",),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
  ) { }

  ngOnInit() { }



  togglePasswordFieldType(): void {
    this.showPassword = !this.showPassword;
  }


  signAction() {
    // if (this.validateInputs()) {
    console.log(this.registerForm.value)
    this.postData.userName = this.registerForm.value.username;
    this.postData.phoneNumber = this.registerForm.value.phonenumber;
    this.postData.email = this.registerForm.value.email;
    this.postData.passcode = this.registerForm.value.password;
    this.postData.pincode = this.registerForm.value.pincode;
    this.postData.address = this.registerForm.value.address;
    this.postData.wifiName = this.registerForm.value.wifiName;
    this.postData.wifiPassword = this.registerForm.value.wifiPassword;
    this.authService.signup(this.postData).subscribe(
      (res: any) => {
        if (res.statusCode == 1) {
          // Storing the User data.
          this.storageService
            .store(AuthConstants.AUTH, res.userData)
            .then(res => {
              this.router.navigate([AppRoutes.LOGIN]);
            });
        } else {
          this.toastService.presentToast(
            'Data alreay exists, please enter new details.', 'red'
          );
        }
      },
      (error: any) => {
        this.toastService.presentToast('Network Issue.', 'red');
      }
    );
    // } else {
    // this.toastService.presentToast(
    // 'Please enter email, username or password.',"red"
    // );
    // }
  }
}
