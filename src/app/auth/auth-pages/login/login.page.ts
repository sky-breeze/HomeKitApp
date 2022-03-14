import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/constants/AuthConstants';
import { AppRoutes } from 'src/app/constants/constant';
import { userInterface } from 'src/app/interface/user';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  postData = {
    phoneNumber: '',
    passcode: ''
  };
  showPassword = false;

  // authState = new BehaviorSubject(false);

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.min(8)]),

  });

  constructor(
    private router: Router,
    private authService: AuthService,
    // private fireAuth : AngularFireAuth,
    private toastService: ToastService,
    private http: HttpClient,
    private storageService: StorageService,
    private ngZone: NgZone,
  ) {

    console.log('login constructor!!!!!')
  }

  ngOnInit() {




  }



  togglePasswordFieldType(): void {
    this.showPassword = !this.showPassword;
  }

  validateInputs() {
    console.log(this.loginForm.value.email)
    let username = this.loginForm.value.email.trim();
    let password = this.loginForm.value.password.trim();
    return (
      this.loginForm.value.username &&
      this.loginForm.value.password &&
      username.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    // if (this.validateInputs()) {
    console.log(this.loginForm.value.username)
    console.log(this.loginForm.value.password)
    this.postData.phoneNumber = this.loginForm.value.username
    this.postData.passcode = this.loginForm.value.password
    console.log('loginAction', this.postData)


    this.authService.login(this.postData).subscribe(
      (res: any) => {
        console.log('loginAction response', res)
        if (res.statusCode == 1) {
          localStorage.setItem('luUserUuid', res.data.luUserUuid)
          localStorage.setItem('userName', res.data.userName)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('phoneNumber', res.data.phoneNumber)
          this.router.navigateByUrl(AppRoutes.TABS);
        } else {
          console.log('incorrect password.');
          this.toastService.presentToast('Incorrect username or password.', 'red');
        }
      },
      (error: any) => {
        console.log('Network Issue.');
        this.toastService.presentToast('Network Issue.', 'red');
      }
    );

  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }


}
