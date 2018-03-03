import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Platform } from "ionic-angular";

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class CustomControlProvider {


  loader : any;
  alert : any;
  constructor(public platform: Platform, private loading: LoadingController, private alertCtrl : AlertController) {
  }

  // loader show
  showLoader(){
     this.loader = this.loading.create({
      content: 'please wait',
    });
    this.loader.present();
  }
  // loader hide
  hideLoader(){
    this.loader.dismiss();
  }

  // show alert
  ShowAlert(title :string,message : string){
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{text:'ok',role: 'cancel'}]
    })
    this.alert.present();
  }
  // hide alert
  hideAlert(){
    this.alert.dismiss();
  }

  // check for network connection
  checkNetwork() {
    if (this.platform.is("cordova")) {
    this.platform.ready().then(() => {
      if (navigator.connection.type == Connection.NONE) {
        this.ShowAlert('Alert',"No Internet Connection");
      }
    });
  }
  }
}
