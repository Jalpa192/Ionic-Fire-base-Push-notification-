import { LoginPage } from './../Login/Login';
import { ResetPassword } from './../../interfaces/LoginModel';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CustomControlProvider } from "../../providers/custom-control/custom-control";

@Component({
    selector: 'page-login',
    templateUrl: 'ResetPassword.html'
})
export class ResetPasswordPage {

    resetPasswordModel: ResetPassword;
    ConfirmPassword: string;
    constructor(public navCtrl: NavController, public ctrl: CustomControlProvider, private navParams: NavParams, public authservice: AuthProvider) {
        this.resetPasswordModel = new ResetPassword();
        this.resetPasswordModel.MobileNo = navParams.get('MobileNo');
        this.ctrl.hideLoader();
    }
    resetPassword() {
        if((this.resetPasswordModel.NewPassword==null || this.resetPasswordModel.NewPassword==""
             || this.resetPasswordModel.NewPassword==undefined)  && 
        (this.ConfirmPassword==undefined || this.ConfirmPassword==null || this.ConfirmPassword==""))
        {
                this.ctrl.ShowAlert('Alert', "Please enter new & confirm password");
        }
       else if(this.resetPasswordModel.NewPassword==null || this.resetPasswordModel.NewPassword==undefined 
        || this.resetPasswordModel.NewPassword=="")
        {
            this.ctrl.ShowAlert('Alert', "Please enter new password");
        }
       else if(this.ConfirmPassword==undefined || this.ConfirmPassword==null || this.ConfirmPassword=="")
            {
                this.ctrl.ShowAlert('Alert', "Please enter confirm password");
            }
        else
            {
                if (this.resetPasswordModel.NewPassword == this.ConfirmPassword) {
                    this.authservice.resetPassword(this.resetPasswordModel)
                        .subscribe(gets => {
                            if (gets) {
                                this.ctrl.ShowAlert('Alert', "Your password has been successfully reset");
                                this.navCtrl.setRoot(LoginPage);
                            }
                            else {
                                {
                                    this.ctrl.ShowAlert('Alert', "Error in resetting password please try again later");
                                    this.navCtrl.setRoot(LoginPage);
                                }
                            }
                        });
                }
                else {
                    this.ctrl.ShowAlert('Alert', "New Password & Confirm Password doesnt match");
                    this.navCtrl.setRoot(ResetPasswordPage);
                }
        
            }
    }
}
