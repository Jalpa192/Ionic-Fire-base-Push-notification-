import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TokenModel } from '../../interfaces/LoginModel';
import { AuthProvider } from '../auth/auth';

declare var FCMPlugin;
@Injectable()
export class FcmProvider {

  constructor(public platform: Platform, private authService: AuthProvider) {
  }

  fcmRegisterToken(userId) {
    if (this.platform.is("cordova")) {
      this.tokensetup().then((token) => {
        localStorage.setItem("fcmToken", JSON.stringify(token));
        this.saveTokenToDB(userId, token);
      })
    }
  }

  fcmNotification() {
    FCMPlugin.onNotification(function (data) {
      if (data.wasTapped) {
        //Notification was received on device tray and tapped by the user.
        alert(data.body);
      } else {
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert(data.body);
      }
    });
  }

  fcmTokenRefersh(userId: number) {
    FCMPlugin.onTokenRefresh(function (token) {
      this.saveTokenToDB(userId, token);
    });
  }

  fcmRemoveToken(userId: number){
    this.authService.saveNotificationToken(new TokenModel(userId, {})).subscribe(response => {
      console.log(response);
    });
  }

  private tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function (token) {
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }

  private saveTokenToDB(userId: number, token: any) {
    this.authService.saveNotificationToken(new TokenModel(userId, token)).subscribe(response => {
      console.log(response);
    });
  }
}
