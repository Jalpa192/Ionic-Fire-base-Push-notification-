import { adminMenu, userMenu } from './../pages/index';
import { LoginPage } from './../pages/Login/Login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { userDetails } from "../interfaces/LoginModel";
import { LoginProvider } from "../providers/login/login";
import { AppConstants } from "../providers/constants";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  userDetails: userDetails;
  sideMenu: any;
  imgurl = 'assets/icon/usericon.jpg';

  constructor(config: Config, public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loginprovide: LoginProvider) {
    platform.ready().then(() => {
      config.set('scrollAssist', true);
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.updateSideMenu();
  }

  updateSideMenu() {
    this.loginprovide.currentUser.subscribe(userDetails => {
      this.userDetails = userDetails;
      this.imgurl = this.userDetails.ProfileImage;
      if (this.userDetails.IsAdmin) {
        this.sideMenu = adminMenu;
      }
      else {
        this.sideMenu = userMenu;
      }
    });

  }

  openPage(page) {
    this.nav.setRoot(page.ComponentName);
  }
}

