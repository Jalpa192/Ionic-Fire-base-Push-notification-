import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../Login/Login";
import { FcmProvider } from '../../providers/fcm/fcm';

@Component({
  selector: 'page-Logout',
  template: "Logout",
  providers:[FcmProvider]
})
export class LogoutPage {

  constructor(public navCtrl: NavController, private fcm: FcmProvider) {
    let userId = Number(localStorage.getItem("UserId"));
    localStorage.removeItem("UserId");
    localStorage.clear();
    fcm.fcmRemoveToken(userId);
    this.navCtrl.setRoot(LoginPage);
  }
}
