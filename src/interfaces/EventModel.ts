export interface EventDetails{
  EventDate : Date,
  EventEndTime: string,
  EventName : string,
  EventStartTime: string
  Id :number,
  IsInviteSend : boolean
  TotalInvite : number;
  AcceptedInvite : number;
  Location: string;
  OrganizedBy:string;
  InstructorId : number;
}


export class NotificationModel{
  EventId :number;
  RoleType : any;
  UserIds : any;

  constructor(eventId :number,roleType : any, userIds : any){
    this.EventId = eventId,
    this.RoleType = roleType,
    this.UserIds = userIds
  }
}


export interface ManageEventDetails{
  SubCategoryName: string,
  EventDate : Date,
  EventEndTime: string,
  EventName : string,
  EventStartTime: string
  Id :number,
  IsInviteSend : boolean
}
