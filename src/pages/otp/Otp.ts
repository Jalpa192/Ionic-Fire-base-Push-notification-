import { ResetPasswordPage } from './../resetpassword/ResetPassword';
import { OTPModel } from './../../interfaces/LoginModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { CustomControlProvider } from "../../providers/custom-control/custom-control";

@Component({
  selector: 'page-login',
  templateUrl: 'Otp.html'
})
export class OtpPage {
  OTP: OTPModel;
  constructor(public authservice: AuthProvider, private navCtrl: NavController, private navParams: NavParams, public ctrl: CustomControlProvider) {
    this.OTP = new OTPModel();
    this.OTP.MobileNo = navParams.get('MobileNo');
    this.ctrl.hideLoader();
  }

  ionViewDidLoad() {
  }

  checkOTP() {
    if (this.OTP.Otp == null) {
      this.ctrl.ShowAlert('Alert', "Please enter OTP");
    }
    else {
      this.ctrl.showLoader();
      this.authservice.checkOTP(this.OTP)
        .subscribe(gets => {
          if (gets) {
            this.navCtrl.push(ResetPasswordPage, { MobileNo: this.OTP.MobileNo });
          }
          else {
            this.ctrl.ShowAlert('Alert', "Incorrect OTP code");
            this.navCtrl.push(OtpPage);
          }
        });
    }

  }

}
