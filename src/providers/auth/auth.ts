import { loginDetails, userDetails, IChangePassword, TokenModel, OTPModel, ResetPassword, AutoLogin } from './../../interfaces/LoginModel';
import { Injectable } from '@angular/core';
import { Http, Headers,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppConstants } from "../constants";
import * as CryptoJS from 'crypto-js';
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {

  }

   login(credentials: loginDetails):Observable<userDetails>
  {
      if(credentials.Password!=null)
        {
            credentials.Password = this.encryptPassword(credentials.Password);
        }    
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(credentials));
      return this.http.post(AppConstants.LoginUser, params.toString(), { headers: headers }).map(res => res.json());

  }
  changePassword(credentials: IChangePassword):Observable<number>
  {
      credentials.OldPassword = this.encryptPassword(credentials.OldPassword);
      credentials.NewPassword = this.encryptPassword(credentials.NewPassword);
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(credentials));
      return this.http.post(AppConstants.ChangePassword, params.toString(), { headers: headers }).map(res => res.json());

  }

  // update notification token for user
  saveNotificationToken(tokenModel:TokenModel){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    var params = new URLSearchParams();
    params.set('Request', JSON.stringify(tokenModel));
    return this.http.post(AppConstants.SaveNotificationToken, params.toString(), { headers: headers }).map(res => res.json());
  }
  forgotPassword(mobileno:string):Observable<string>
  {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(mobileno));
      return this.http.post(AppConstants.ForgotPassword, params.toString(), { headers: headers }).map(res => res.json());

  }

  checkOTP(otp:OTPModel):Observable<boolean>
  {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(otp));
      return this.http.post(AppConstants.CheckOTP, params.toString(), { headers: headers }).map(res => res.json());

  }
  resetPassword(credentials: ResetPassword):Observable<boolean>
  {
    if(credentials.NewPassword!=null)
        {
            credentials.NewPassword = this.encryptPassword(credentials.NewPassword);
        }        
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(credentials));
      return this.http.post(AppConstants.ResetPassword, params.toString(), { headers: headers }).map(res => res.json());

  }
  checkMobileNo(mobileNo:string):Observable<boolean>
  {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(mobileNo));
      return this.http.post(AppConstants.CheckMobileNo, params.toString(), { headers: headers }).map(res => res.json());

  }
  private encryptPassword(password:string)
  {
    //Encrypt the Passwort with Base64
    var key = CryptoJS.enc.Base64.parse("#GTLKey#");
    var iv = CryptoJS.enc.Base64.parse("#GTLIV#");

    //Impementing the Key and IV and encrypt the password
    return CryptoJS.AES.encrypt(password, key, { iv: iv }).toString();
  }
  getUserDetailsById(details: AutoLogin):Observable<userDetails>
  {
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      var params = new URLSearchParams();
      params.set('Request', JSON.stringify(details));
      return this.http.post(AppConstants.GetUserDetailsById, params.toString(), { headers: headers }).map(res => res.json());

  }
}
