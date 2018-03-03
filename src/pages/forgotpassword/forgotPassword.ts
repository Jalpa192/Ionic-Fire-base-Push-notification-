import { OtpPage } from './../otp/Otp';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { CustomControlProvider } from "../../providers/custom-control/custom-control";

@Component({
  selector: 'page-login',
  templateUrl: 'forgotPassword.html'
})
export class ForgotPasswordPage {
  MobileNo:string;
  constructor(public authservice: AuthProvider, public ctrl: CustomControlProvider,public navCtrl: NavController) {

    }

  ionViewDidLoad() {
  }
 
  checkMobileNo()
  {
    if(this.MobileNo==null)
      {
        this.ctrl.ShowAlert('Alert', "Please enter your cell number");
      }
      else
        {
          this.ctrl.showLoader();
          this.authservice.checkMobileNo(this.MobileNo)
          .subscribe(gets => {
          if(gets)
            {
              this.authservice.forgotPassword(this.MobileNo)
              .subscribe(gets => {
                if (gets) {
                  this.navCtrl.push(OtpPage,{MobileNo: this.MobileNo});
                }
                else {
                  this.ctrl.ShowAlert('Alert', "Some server error.Please try again later !");
                  this.ctrl.hideLoader();
                }
              });
            }
            else {
              this.ctrl.ShowAlert('Alert', "Cell number is incorrect");
              this.ctrl.hideLoader();
              this.navCtrl.push(ForgotPasswordPage);
            }
          });
        }
  }
}
