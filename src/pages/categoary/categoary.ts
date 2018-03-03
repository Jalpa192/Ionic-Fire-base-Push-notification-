import { EventListPage } from './../event-list/event-list';
import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-categoary',
  templateUrl: 'categoary.html',
})
export class CategoaryPage {

  categoryId: number;
  subCategoryId: number;
  error: any;

  categoryList: any;
  subcategoryList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public categoryProvider: CategoryProvider) {
  }

  ionViewDidLoad() {
    this.categoryProvider.getCategoryList()
      .subscribe(_response => {
        this.categoryList = _response;
      }, _error => this.error = _error);
  }

  LoadSubCategory(categoryId: number) {
    this.categoryProvider.getSubCategoryList(categoryId)
      .subscribe(_response => {
        this.subcategoryList = _response;
      }, _error => this.error = _error);
  }

  GetEventList(value) {
    localStorage.setItem("CategoryId", value.categoryId);
    localStorage.setItem("SubCategoryId", value.subCategoryId);

    this.navCtrl.push(EventListPage,{
      categoryId: value.categoryId,
      subCategoryId: value.subCategoryId
    });
  }

}
