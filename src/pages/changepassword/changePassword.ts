import { IChangePassword } from './../../interfaces/LoginModel';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { CustomControlProvider } from "../../providers/custom-control/custom-control";

@Component({
  selector: 'page-login',
  templateUrl: 'changePassword.html'
})
export class ChangePasswordPage {

  credentials = {} as IChangePassword;
  result: number;
  constructor(public navCtrl: NavController, public authservice: AuthProvider,  public ctrl: CustomControlProvider) {
    this.credentials.Id = parseInt(localStorage.getItem("UserId"));
  }

  ionViewDidLoad() {
  }
  changePassword() {
    if (this.credentials.OldPassword != null && this.credentials.NewPassword != null) {
      if (this.credentials.OldPassword != this.credentials.NewPassword) {
        this.ctrl.showLoader();
        this.authservice.changePassword(this.credentials)
          .subscribe(gets => {
            this.result = gets
            if (this.result == 1) {
              this.ctrl.ShowAlert("Alert","Password changed successfully");
              this.ctrl.hideLoader();
              this.navCtrl.push(ChangePasswordPage);
            }
            else if (this.result == 2) {
              this.ctrl.ShowAlert("Alert","Current password does not match the existing password");
              this.ctrl.hideLoader();
              this.navCtrl.push(ChangePasswordPage);
            }
          })
      }
      else {
        this.ctrl.ShowAlert("Alert","Current password & new password are identical");
        this.ctrl.hideLoader();
        this.navCtrl.push(ChangePasswordPage);
      }
    }
    else if (this.credentials.OldPassword == null && this.credentials.NewPassword != null) {
      this.ctrl.ShowAlert("Alert","Please enter current password");
      
    }
    else if (this.credentials.NewPassword == null && this.credentials.OldPassword != null) {
      this.ctrl.ShowAlert("Alert","Please enter new password");
    }
    else {
      this.ctrl.ShowAlert("Alert","Please enter current & new password");
    }

  }

}
