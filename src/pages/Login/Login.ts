import { SplashScreen } from '@ionic-native/splash-screen';
import { AutoLogin } from './../../interfaces/LoginModel';
import { LogoutPage } from './../Logout/Logout';
import { CustomControlProvider } from './../../providers/custom-control/custom-control';
import { LoginProvider } from './../../providers/login/login';
import { ForgotPasswordPage } from './../forgotpassword/forgotPassword';
import { CategoaryPage } from './../categoary/categoary';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { loginDetails, userDetails } from "../../interfaces/LoginModel";
import { AuthProvider } from "../../providers/auth/auth";
import { NormalUserPage } from "../NormalUser/NormalUser";
import { MenuController } from 'ionic-angular';
import { Device } from "@ionic-native/device";

@Component({
  selector: 'page-login',
  templateUrl: 'Login.html',
  providers: [Device]
})
export class LoginPage {
  credentials = {} as loginDetails;
  user: userDetails;
  isShow:boolean;
  autoLoginModel:AutoLogin;
  constructor(public navCtrl: NavController,public splashScreen: SplashScreen, public ctrl: CustomControlProvider, public loginprovide: LoginProvider,
    public device: Device, public navParams: NavParams, public authservice: AuthProvider, public menuController: MenuController) {

    this.credentials = new loginDetails();
    this.credentials.DeviceId = device.uuid;
    this.menuController.enable(false);
    let userId = localStorage.getItem("UserId");
    let mobileNo = localStorage.getItem("MobileNo");
    if(userId!=null)
      {
        this.isShow=true;
        splashScreen.show();
        this.autoLogin(userId,mobileNo);
      } 
      else
        {
          this.isShow=false;
        }
  }

  ionViewDidLoad() {
    this.ctrl.checkNetwork();
  }
  autoLogin(userId,mobileNo)
  {
    this.autoLoginModel=new AutoLogin();
    this.autoLoginModel.Id=parseInt(userId);
    this.autoLoginModel.DeviceId=this.device.uuid;
    this.autoLoginModel.MobileNo=mobileNo;
    this.authservice.getUserDetailsById(this.autoLoginModel)
    .subscribe(gets => {
      this.user = gets;
      if (this.user != null) {
        this.setNavigationPage();
      }
      else
      {
        this.navCtrl.setRoot(LogoutPage);
      }
    });
  }
  signin() {
    this.ctrl.showLoader();
    this.authservice.login(this.credentials)
      .subscribe(gets => {
        this.user = gets;
        if (this.user.Status == 1) {
          this.credentials.Password=null;
          this.ctrl.ShowAlert('Alert', "Invalid cell number or password");
          this.ctrl.hideLoader();
        }
        else if (this.user.Status == 2) {
          this.credentials.Password=null;
          this.ctrl.ShowAlert('Alert', "Your registered device has been changed.Please contact Admin for further details");
          this.ctrl.hideLoader();
        }
        else if (this.user.Status == 4) {
          this.credentials.Password=null;
          this.ctrl.ShowAlert('Alert', "Invalid User");
          this.ctrl.hideLoader();
        }
        else {
          localStorage.setItem("UserId", this.user.Id.toString());
          localStorage.setItem("MobileNo", this.user.MobileNo.toString());
          this.setNavigationPage();
          this.ctrl.hideLoader();
        }
      }, error => {
        this.ctrl.hideLoader();
        this.credentials.Password=null;
        this.ctrl.ShowAlert('Alert', "server error");
      }
      );
  }
  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  setNavigationPage() {
    this.loginprovide.currentUser.emit(this.user);
    this.menuController.enable(true);
    if (this.user.IsAdmin == true) {
      this.navCtrl.setRoot(CategoaryPage);
    }
    else {
      this.navCtrl.setRoot(NormalUserPage);
    }
  }

}
