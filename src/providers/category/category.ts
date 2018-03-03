import { AppConstants } from './../constants';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class CategoryProvider {

  constructor(public http: Http) {
  }

  getCategoryList() {
    return this.http.get(AppConstants.GetCategoryList)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  getSubCategoryList(categoryId : number) {
    return this.http.get(AppConstants.GetSubcategoryList+categoryId)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
