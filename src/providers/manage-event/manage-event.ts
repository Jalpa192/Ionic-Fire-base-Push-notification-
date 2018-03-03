import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { AddEvent } from '../../interfaces/AddEventModel';
import { AppConstants } from "../constants";


@Injectable()
export class ManageEventProvider {

    constructor(public http: Http) {
    }

    addEvent(addEvent: AddEvent) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new URLSearchParams();
        params.set('Request', JSON.stringify(addEvent));
        return this.http.post(AppConstants.AddEvent, params.toString(), { headers: headers }).map(res => res.json());
    }

    getLocationList() {
        return this.http.get(AppConstants.GetLocation).map(res => res.json())
    }

    deleteEvent(Id: number) {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new URLSearchParams();
        params.set('Request', JSON.stringify(Id));
        return this.http.post(AppConstants.DeleteEvent, params.toString(), { headers: headers }).map(res => res.json())

    }

    getUser() {
        return this.http.get(AppConstants.GetUser).map(res => res.json())
    }
}
