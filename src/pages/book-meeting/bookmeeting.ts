import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-bookmeeting',
  templateUrl: 'bookmeeting.html',
})
export class BookMeetingPage {

  constructor(private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.openbrowser();
  }
  openbrowser(){
    const browser = this.iab.create('http://202.131.103.146:8881/Web/index.php','_self',{location:'no'});
    browser.show();
  }

}
