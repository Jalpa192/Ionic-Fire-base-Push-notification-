import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { PhotoGalleryProvider } from "../../providers/image-photo-gallery/photo-gallery";

@Component({
  selector: 'page-PhotoGallery',
  templateUrl:"PhotoGallery.html"
})
export class PhotoGalleryPage {
 
 teamList:any
 userList:any
 constructor(public navCtrl: NavController, public navParams: NavParams, public photoGalleryProvider: PhotoGalleryProvider) {
  }

  ionViewDidLoad() {
    this.photoGalleryProvider.getProfiles()
      .subscribe(_response => {
        this.teamList = _response;
      }, _error => {});
  }

  LoadTeam(team){
      this.photoGalleryProvider.getTeamListById(team)
          .subscribe(_response => {
            this.userList = _response;
          }, _error => {});
  }

}
