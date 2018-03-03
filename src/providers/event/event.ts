import { selectList } from './../../interfaces/SelectModel';
import { EventDetails, NotificationModel } from './../../interfaces/EventModel';
import { Injectable } from '@angular/core';
import { Http, Response, Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { UserDetails } from "../../interfaces/UserModel";
import { AppConstants } from "../constants";

@Injectable()
export class EventProvider {

  constructor(public http: Http) {
  }

  getEventsList(subcategoryId: number): Observable<EventDetails[]> {
    return this.http.get(AppConstants.GetAdminEventList+subcategoryId)
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  getRoleList(): Observable<selectList> {
    return this.http.get(AppConstants.GetRoleList)
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  getEventConfirmationList(eventId: number): Observable<Array<UserDetails>> {
    return this.http.get(AppConstants.GetEventConfirmationList+eventId)
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  saveInviteForEvent(model: NotificationModel){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    var params = new URLSearchParams();
    params.set('Request', JSON.stringify(model));

    return this.http.post(AppConstants.SaveSendEventInvite, params.toString(), { headers: headers })
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  SendInviteRemiderForEvent(model: NotificationModel){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    var params = new URLSearchParams();
    params.set('Request', JSON.stringify(model));

    return this.http.post(AppConstants.SendEventInviteRemider, params.toString(), { headers: headers })
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  saveNotificationForEvent(eventId : number){
    return this.http.get(AppConstants.SaveSendEventRemider+eventId)
        .map(res => res.json())
        .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
