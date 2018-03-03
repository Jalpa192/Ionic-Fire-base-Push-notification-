import { FcmProvider } from './../../providers/fcm/fcm';
import { Component, OnInit } from '@angular/core';
import { NormalUserProvider } from '../../providers/normal-user/normal-user';
import { NormalUser } from '../../interfaces/NormalUserModel';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'normal-user',
  templateUrl: 'NormalUser.html',
  providers:[FcmProvider]
})

export class NormalUserPage implements OnInit {
  normalUsers: NormalUser[];
  eventid: number;
  userid: number;
  id: number;
  count: number;

  constructor(private normaluserservice: NormalUserProvider, public navController: NavController, private fcm: FcmProvider) {
    this.id = Number(localStorage.getItem("UserId"));
    fcm.fcmRegisterToken(this.id);
  }

  ionViewDidLoad() {
    this.fcm.fcmNotification();
    this.fcm.fcmTokenRefersh(this.id);
  }

  ngOnInit(): void {
    this.getuserEvents();
  }

  // refesh page on page pull down
  doRefresh(refresher) {
    setTimeout(() => {
      this.getuserEvents();
      refresher.complete();
    }, 2000);
  }

  getuserEvents() {
    this.normaluserservice.getAllEventsByUser(this.id).subscribe(gets => {
      this.normalUsers = gets;
      this.count = gets.length;
    })
  }

  Confirm(normalUser: NormalUser) {
    normalUser.Confirmation = 2;
    this.normaluserservice.saveTransactionByUser(normalUser).subscribe(gets => {
      this.navController.setRoot(this.navController.getActive().component);
    });
  }

  Reject(normalUser: NormalUser) {
    normalUser.Confirmation = 3;
    this.normaluserservice.saveTransactionByUser(normalUser).subscribe(gets => {
      this.navController.setRoot(this.navController.getActive().component);
    });
  }
}



