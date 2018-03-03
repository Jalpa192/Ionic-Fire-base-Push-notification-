import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { pageComponets } from "../pages/index";
import { pipeList } from './../pipes/index';
import { AuthProvider } from '../providers/auth/auth';
import { CategoryProvider } from '../providers/category/category';
import { EventProvider } from '../providers/event/event';
import { NormalUserProvider } from '../providers/normal-user/normal-user';
import { LoginProvider } from '../providers/login/login';
import { ManageEventProvider } from '../providers/manage-event/manage-event';
import { DatePicker } from '@ionic-native/date-picker';
import { CustomControlProvider } from '../providers/custom-control/custom-control';
import { PhotoGalleryProvider } from "../providers/image-photo-gallery/photo-gallery";


@NgModule({
  declarations: [
    MyApp,
    pageComponets,
    pipeList

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    pageComponets
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CategoryProvider,
    EventProvider,
    NormalUserProvider,
    LoginProvider,
    ManageEventProvider,
    DatePicker,
    Device,
    InAppBrowser,
    CustomControlProvider,
    PhotoGalleryProvider
  ]
})
export class AppModule {}
