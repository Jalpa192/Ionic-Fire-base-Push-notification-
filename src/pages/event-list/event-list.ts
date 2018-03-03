import { EventDetails, NotificationModel } from './../../interfaces/EventModel';
import { EventProvider } from './../../providers/event/event';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';
import { EventConfirmationPage } from "../event-confirmation/event-confirmation";
import { CustomControlProvider } from "../../providers/custom-control/custom-control";
import { AddEventPage } from '../../pages/ManageEvent/AddEvent';
import { ManageEventProvider } from '../../providers/manage-event/manage-event';
import { AddEvent } from '../../interfaces/AddEventModel';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  subCategoryId: number;
  error: any;
  eventList: EventDetails[];
  eventId: number;
  roleList: any;

  colors: string[] = ["pink", "green", "orange", "blue", "red", "purple"];

  addEventPage: any;
  IsInvitationSend: boolean;
  constructor(private _getService: ManageEventProvider, public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public eventService: EventProvider, public ctrl: CustomControlProvider) {
    this.subCategoryId = navParams.get('subCategoryId');

    this.addEventPage = AddEventPage;
  }

  ionViewDidLoad() {
    this.ctrl.showLoader();
    this.getEvents();
    this.eventService.getRoleList()
      .subscribe(_response => {
        // set items to json response
        this.roleList = _response;
      }, _error => this.error = _error);
  }

  getEvents() {
    this.eventService.getEventsList(this.subCategoryId)
      .subscribe(_response => {
        // set items to json response
        this.eventList = _response;
        this.ctrl.hideLoader();
      }, _error => {
        this.error = _error;
        this.ctrl.hideLoader();
      });
  }

  goToViewConfirmationPage(item: EventDetails) {
    this.navCtrl.push(EventConfirmationPage, {
      eventdetails: item,
    });
  }

  sendInvitePopup(eventId: number, slidingItem: ItemSliding) {
    slidingItem.close();
    this.eventId = eventId;
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Event Users');

    this.roleList.forEach(element => {
      alert.addInput({
        type: 'checkbox',
        label: element.Text,
        value: element.Value,
      });
    });
    alert.addButton({
      text: 'Cancel',
      handler: () => {
        this.eventId = null;
      }
    });
    alert.addButton({
      text: 'Okay',
      handler: (data: any) => {
        this.sendInvite(data);
      }
    });

    alert.present();
  }

  sendInvite(data: any) {
    if (data.length > 0) {
      this.ctrl.showLoader();
      this.eventService.saveInviteForEvent(new NotificationModel(this.eventId, data, null))
        .subscribe(_response => {
          this.getEvents();
        }, _error => this.error = _error);
    }
  }

  sendNotification(eventId: number, slidingItem: ItemSliding) {
    this.ctrl.showLoader();
    slidingItem.close();
    this.eventService.saveNotificationForEvent(eventId).subscribe(_response => {
      this.ctrl.hideLoader();
    }, _error => this.error = _error);
  }

  // refesh page on page pull down
  doRefresh(refresher) {
    setTimeout(() => {
      this.getEvents();
      refresher.complete();
    }, 2000);
  }

  DeleteEvent(Id: number) {
    this.ctrl.showLoader();
    this._getService.deleteEvent(Id).subscribe(resp => {
      this.ctrl.hideLoader();
      this.IsInvitationSend = resp;
      
      if (!this.IsInvitationSend) {
        this.ctrl.ShowAlert("Alert","Event notification has been sent. so you cannot delete.");
      }
      else{
        this.eventList = this.eventList.filter(function(item){
          return item.Id !== Id
        });
      }
    },error =>{
      this.ctrl.hideLoader();
    });
  }

  EditEvent(addEvent: AddEvent) {
    this.navCtrl.push(AddEventPage, {
      Id: addEvent.Id,
      CategoryId: addEvent.CategoryId,
      LocationId: addEvent.LocationId,
      SubCategoryId: addEvent.SubCategoryId,
      EventName: addEvent.EventName,
      EventDate: addEvent.EventDate,
      EventStartTime: addEvent.EventStartTime,
      EventEndTime: addEvent.EventEndTime,
      InstructorId:addEvent.InstructorId
    })

  }
}
