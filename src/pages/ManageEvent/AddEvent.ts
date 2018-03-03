import { EventListPage } from './../event-list/event-list';
import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { AddEvent } from '../../interfaces/AddEventModel';
import { ManageEventProvider } from '../../providers/manage-event/manage-event';
import { AddEventDetails, selectList } from '../../interfaces/AddEventModel';
import { CustomControlProvider } from './../../providers/custom-control/custom-control';

@Component({
    selector: 'manage-event',
    templateUrl: 'AddEvent.html',
})
export class AddEventPage {

    categoryId: number;
    subCategoryId: number;
    locationId: number;
    error: any;
    addEvent: AddEvent;
    categoryList: any;
    subcategoryList: any;

    Id;
    EventName: string;
    EventDate: Date;
    EventStartTime: string;
    EventEndTime: string;
    addEventDetails: AddEventDetails;
    IsUpdate: boolean = false;
    title: string;
    IsExists: string;
    InstructorId : number;
    date: Date = new Date();
    locationList: any;
    instructor:selectList;
    constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,
        public categoryProvider: CategoryProvider, private manageEventService: ManageEventProvider, public ctrl: CustomControlProvider) {
        this.GetUser();
        this.Id = navParams.get("Id");
        this.categoryId = Number(localStorage.getItem("CategoryId"));
        this.locationId = navParams.get("LocationId");
        this.InstructorId = navParams.get("InstructorId");
        this.subCategoryId = Number(localStorage.getItem("SubCategoryId"));
        this.EventName = navParams.get("EventName");
        this.EventDate = navParams.get("EventDate");
        this.EventStartTime = navParams.get("EventStartTime");
        this.EventEndTime = navParams.get("EventEndTime")
    }

    ionViewDidLoad() {
        this.manageEventService.getLocationList()
            .subscribe(_response => {

                this.locationList = _response;
            }, _error => this.error = _error);
        if (this.Id != undefined) {
            if (this.Id != 0) {
                this.IsUpdate = true;
                this.title = "Edit Event"
            }
            else {
                this.title = "Add Event"
            }
        }
        else {
            this.title = "Add Event"
        }
    }

    AddEvent(addEvent: AddEvent) {
        addEvent.CategoryId = this.categoryId;
        addEvent.SubCategoryId = this.subCategoryId;
        let dateString = addEvent.EventDate.toString();
        let eventdate = new Date(dateString);


        if (eventdate.getFullYear() < this.date.getFullYear()) {
            this.ctrl.ShowAlert('Alert', "Please select today date/future date.");
            return false;
        }
        else if (eventdate.getFullYear() == this.date.getFullYear() && ((eventdate.getMonth() + 1) < (this.date.getMonth() + 1))) {
            this.ctrl.ShowAlert('Alert', "Please select today date/future date.");
            return false;
        }
        if (eventdate.getFullYear() == this.date.getFullYear()) {
            if ((eventdate.getMonth() + 1) == (this.date.getMonth() + 1)) {
                if (eventdate.getDate() < this.date.getDate()) {
                    this.ctrl.ShowAlert('Alert', "Please select today date/future date.");
                    return false;
                }
                else if (eventdate.getDate() == this.date.getDate()) {
                    if (Number(addEvent.EventStartTime.split(':')[0]) < this.date.getHours()) {
                        this.ctrl.ShowAlert('Alert', "Please select future time for today's date.");
                        return false;
                    }
                    else if (Number(addEvent.EventStartTime.split(':')[0]) == this.date.getHours()) {
                        if (Number(addEvent.EventStartTime.split(':')[1]) <= this.date.getMinutes()) {
                            this.ctrl.ShowAlert('Alert', "Please select future time for today's date");
                            return false;
                        }
                    }
                    if (Number(addEvent.EventStartTime.split(':')[0]) > Number(addEvent.EventEndTime.split(':')[0])) {
                        this.ctrl.ShowAlert('Alert', "Event end time must be greater than start time.");
                        return false;
                    }
                    else if (Number(addEvent.EventStartTime.split(':')[0]) == Number(addEvent.EventEndTime.split(':')[0])) {
                        if ((Number(addEvent.EventStartTime.split(':')[1]) > Number(addEvent.EventEndTime.split(':')[1])) ||
                            Number(addEvent.EventStartTime.split(':')[1]) == Number(addEvent.EventEndTime.split(':')[1])) {
                            this.ctrl.ShowAlert('Alert', "Event end time must be greater than start time.");
                            return false;
                        }
                    }
                }
            }
            else if ((eventdate.getMonth() + 1) > (this.date.getMonth() + 1)) {
                if (Number(addEvent.EventStartTime.split(':')[0]) > Number(addEvent.EventEndTime.split(':')[0])) {
                    this.ctrl.ShowAlert('Alert', "Event end time must be greater than start time.");
                    return false;
                }
                else if (Number(addEvent.EventStartTime.split(':')[0]) == Number(addEvent.EventEndTime.split(':')[0])) {
                    if ((Number(addEvent.EventStartTime.split(':')[1]) > Number(addEvent.EventEndTime.split(':')[1])) ||
                        Number(addEvent.EventStartTime.split(':')[1]) == Number(addEvent.EventEndTime.split(':')[1])) {
                        this.ctrl.ShowAlert('Alert', "Event end time must be greater than start time.");
                        return false;
                    }
                }
            }
        }

        this.manageEventService.addEvent(addEvent).subscribe(res => {
            this.IsExists = res;
            if (this.IsExists == "LocationBooked") {
                this.ctrl.ShowAlert('Alert', "Location has been already booked in this time slot.");
            }
            else if (this.IsExists == "Exists") {
                this.ctrl.ShowAlert('Alert', "EventName/ Event Date/ Event Time exists in system.");
            }
            else if (this.IsExists == "NotificationSend") {
                this.ctrl.ShowAlert('Alert', "Event notification has been sent. so you cannot edit.");
            }
            else if (this.IsExists == "IsValidOrganizedBy") {
                this.ctrl.ShowAlert('Alert', "Organizer has been already booked in this time slot.");
            }
            else {
                this.navCtrl.push(EventListPage, {
                    categoryId: this.categoryId,
                    subCategoryId: this.subCategoryId
                });
            }
        })
    }

    GetUser()
    {
        this.manageEventService.getUser().subscribe(res => {
            this.instructor=res;
        });
    }
}
