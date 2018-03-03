import { AppConstants } from './../constants';
import { Injectable } from '@angular/core';
import { Http, Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { NormalUser } from '../../interfaces/NormalUserModel';

@Injectable()
export class NormalUserProvider {

  constructor(public http: Http) {
  }

  getAllEventsByUser(id: number) {
    return this.http.get(AppConstants.GetNormalUserEventList + id).map(res => res.json());
  }

  saveTransactionByUser(normalUser: NormalUser) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    var params = new URLSearchParams();
    params.set('Id', "" + normalUser.Id + "");
    params.set('UserId', "" + normalUser.UserId + "");
    params.set('EventId', "" + normalUser.EventId + "");
    params.set('Confirmation', "" + normalUser.Confirmation + "");
    params.set('NotificationSend', "true");
    return this.http.post(AppConstants.SaveNormalUserEventConfirmation, params.toString(), { headers: headers }).map(res => res.json());
  }

}
