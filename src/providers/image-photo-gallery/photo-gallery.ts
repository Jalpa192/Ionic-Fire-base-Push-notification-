import { AppConstants } from './../constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PhotoGalleryProvider {

  constructor(public http: Http) {
  }

  getProfiles() {
    return this.http.get(AppConstants.GetProfiles)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getTeamListById(teamId : number) {
    return this.http.get(AppConstants.GetTeamListById+teamId)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
