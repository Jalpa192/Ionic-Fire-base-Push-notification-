export interface AddEvent{
  Id: number;
  CategoryId: number;
  SubCategoryId: number,  
  EventName : string,
  EventDate : Date,
  EventStartTime: string,
  EventEndTime: string,
  LocationId: number,
  InstructorId:number
}

export interface AddEventDetails{
  ManageEventViewModel: AddEvent;
}


export interface selectList {
    Key: string;
    Value: string;
}