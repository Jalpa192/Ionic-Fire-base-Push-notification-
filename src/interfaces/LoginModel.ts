export class loginDetails {
  MobileNo: string;
  Password: string;
  DeviceId:string;
}


export interface userDetails {
  IsAdmin: boolean,
  Id: number,
  Password: string,
  RoleName: string,
  MobileNo: string,
  Email: string,
  FirstName: string,
  IsActive: boolean,
  LastName: string,
  TokenId: string,
  DeviceId:string,
  Status:number,
  ProfileImage : string;
}

export interface IChangePassword {
  Id: number;
  OldPassword: string;
  NewPassword: string;
}

export class ResetPassword {
  MobileNo: string;
  NewPassword: string;
}
export class AutoLogin {
  Id: number;
  DeviceId:string;
  MobileNo: string;
}

export class TokenModel {

  UserId: number;
  Token: any;
  constructor(userId: number, token: any) {
    this.UserId = userId,
      this.Token = token
  }
}
  export class OTPModel {
      MobileNo: string;
      Otp: string;
}
