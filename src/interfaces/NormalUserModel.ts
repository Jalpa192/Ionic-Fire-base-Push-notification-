export interface NormalUser{
    Id: number;
    UserId: number;
    EventId: number;
    NotificationSend: boolean;
    Confirmation: number;
    Location : string;
    OrganizedBy:string;
}