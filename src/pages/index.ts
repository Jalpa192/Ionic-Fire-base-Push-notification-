import { OtpPage } from './otp/Otp';
import { ResetPasswordPage } from './resetpassword/ResetPassword';
import { EventConfirmationPage } from './event-confirmation/event-confirmation';
import { EventListPage } from './event-list/event-list';
import { CategoaryPage } from './categoary/categoary';
import { LoginPage } from './Login/Login';
import { NormalUserPage } from './NormalUser/NormalUser';
import { ChangePasswordPage } from './changepassword/changePassword';
import { ForgotPasswordPage } from './forgotpassword/forgotPassword';
import { LogoutPage } from "./Logout/Logout";
import { AddEventPage } from './ManageEvent/AddEvent'
import { BookMeetingPage } from "./book-meeting/bookmeeting";
import { PhotoGalleryPage } from "./photogallery/photogallery";
export const pageComponets = 
[BookMeetingPage, LogoutPage, LoginPage, CategoaryPage, EventListPage, EventConfirmationPage, NormalUserPage, 
  ChangePasswordPage, ForgotPasswordPage, ResetPasswordPage, OtpPage, AddEventPage,PhotoGalleryPage];

export const adminMenu =[
  {  menuName :"Category", ComponentName:CategoaryPage},
  {  menuName :"Book Meeting Room", ComponentName:BookMeetingPage},
  {  menuName :"Change Password", ComponentName:ChangePasswordPage},
  {  menuName :"Photo Gallery", ComponentName:PhotoGalleryPage},
  {  menuName :"Log out", ComponentName:LogoutPage}
];
export const userMenu =[
  {  menuName :"Notification", ComponentName:NormalUserPage},
  {  menuName :"Book Meeting Room", ComponentName:BookMeetingPage},
  {  menuName :"Change Password", ComponentName:ChangePasswordPage},
  {  menuName :"Photo Gallery", ComponentName:PhotoGalleryPage},
  {  menuName :"Log out", ComponentName:LogoutPage}

];
