import { CustomControlProvider } from './../../providers/custom-control/custom-control';
import { UserDetails } from './../../interfaces/UserModel';
import { EventDetails, NotificationModel } from './../../interfaces/EventModel';
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";


@Component({
  selector: 'page-event-confirmation',
  templateUrl: 'event-confirmation.html',
})
export class EventConfirmationPage {

  eventdetails: EventDetails;
  error: any;
  userList: Array<UserDetails>;
  status: string = "2";

  acceptUserList: Array<UserDetails>;
  acceptUserCount: number;
  waitUserList: Array<UserDetails>;
  waitUserCount: number;
  rejectUserList: Array<UserDetails>;
  rejectUserCount: number;

  remiderList: number[];
  showFooter: boolean = false;
  multiRemider:any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventProvider, public ctrl: CustomControlProvider) {
    this.eventdetails = navParams.get('eventdetails');
  }

  ionViewDidLoad() {
    this.ctrl.showLoader();
    this.eventService.getEventConfirmationList(this.eventdetails.Id)
      .subscribe(_response => {
        // set items to json response
        this.userList = _response;
        this.ctrl.hideLoader();
        this.getAcceptedUser();
        this.getWaitingUser();
        this.getRejectUser();
      }, _error => {
        this.error = _error;
        this.ctrl.hideLoader();
      });

    this.remiderList = [];
  }

// #region userlist
  getAcceptedUser() {
    this.acceptUserList = this.userList.filter(function (user) {
      return user.Status == 2;
    });
    this.acceptUserCount = this.acceptUserList.length;
  }

  getWaitingUser() {
    this.waitUserList = this.userList.filter(function (user) {
      return user.Status == 1;
    });
    this.waitUserCount = this.waitUserList.length;
    this.multiRemider = this.waitUserList.map(function(user){
      return {'userId': user.Id, 'checked': false};
    });
  }


  getRejectUser() {
    this.rejectUserList = this.userList.filter(function (user) {
      return user.Status == 3;
    });
    this.rejectUserCount = this.rejectUserList.length;
  }

// #endregion

// #region notification
  sendSingleRemider(userId: number) {
    this.remiderList = [];
    this.remiderList.push(userId);
    this.sendRemiderNotification();
  }

  sendMultipleRemider(userId: number) {
    if (this.remiderList.indexOf(userId) != -1) {
      this.remiderList = this.remiderList.filter(function (index) {
        return index != userId;
      });
      this.IsChecked(userId, false);
    }
    else {
      this.remiderList.push(userId);
      this.IsChecked(userId, true);

    }
    this.showFooter = this.remiderList.length > 0;
  }

  IsChecked(userId: number,ischeck : boolean){
    this.multiRemider.forEach(function(user) {
        if(user.userId === userId)
        {
          user.checked = ischeck;
        }
    });
  }

  sendRemiderNotification() {
    this.ctrl.showLoader();

    this.eventService.SendInviteRemiderForEvent(new NotificationModel(this.eventdetails.Id, null, this.remiderList))
      .subscribe(_response => {
        // clear remider list
        this.remiderList = [];
        this.multiRemider.forEach(function(user) {
              user.checked = false;
        });
        // hide footer
        this.showFooter = false;
        // hide loader
        this.ctrl.hideLoader();
      }, _error => {
      this.error = _error;
        this.ctrl.hideLoader();
      });

  }
  // #endregion

}
