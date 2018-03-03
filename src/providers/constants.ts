export class AppConstants {
  // change api name accourding to iis configuartion of api
  private static BaseApiUrl = 'http://192.168.10.154/EventManagement/api/';
  // private static BaseApiUrl = 'http://202.131.103.151:7321/api/';
  //private static BaseApiUrl = 'http://192.168.10.41/event.api/api/';
  /*api Urls */

  //Login
  public static LoginUser = AppConstants.BaseApiUrl + "Login/LoginUser";

  public static ChangePassword = AppConstants.BaseApiUrl + "Login/ChangePassword";

  public static SaveNotificationToken = AppConstants.BaseApiUrl + "Login/SaveNotificationToken";

  public static ForgotPassword = AppConstants.BaseApiUrl + "Login/ForgotPassword";

  public static CheckOTP = AppConstants.BaseApiUrl + "Login/CheckOtp";

  public static ResetPassword = AppConstants.BaseApiUrl + "Login/ResetPassword";

  public static CheckMobileNo = AppConstants.BaseApiUrl + "Login/CheckMobileNo";

  public static GetUserDetailsById = AppConstants.BaseApiUrl + "Login/GetUserDetailsById?id=";

  // category list
  public static GetCategoryList = AppConstants.BaseApiUrl + "category/GetCategories";
  // sub category list
  public static GetSubcategoryList = AppConstants.BaseApiUrl + "category/GetSubCategories/";
  // event list
  public static GetAdminEventList = AppConstants.BaseApiUrl + "event/GetEventsList/";
  // confirmation list
  public static GetEventConfirmationList = AppConstants.BaseApiUrl + "event/GetEventUserList/";

  // role list for notification
  public static GetRoleList = AppConstants.BaseApiUrl + "event/GetRoleList";

  //save user invite
  public static SaveSendEventInvite = AppConstants.BaseApiUrl + "event/SaveInvite";

  public static SendEventInviteRemider = AppConstants.BaseApiUrl + "event/SendInviteRemider";

  public static SaveSendEventRemider = AppConstants.BaseApiUrl + "Notification/SendNotifications/";

  public static GetNormalUserEventList = AppConstants.BaseApiUrl + "normaluser/GetAllEventsByUser?id=";

  public static SaveNormalUserEventConfirmation = AppConstants.BaseApiUrl + "normaluser/SaveTransactionByUser";

  public static AddEvent = AppConstants.BaseApiUrl + "ManageEvent/AddManageEvent";

  public static GetAllEvents = AppConstants.BaseApiUrl + "ManageEvent/GetAllEvents";

  public static GetEventById = AppConstants.BaseApiUrl + "ManageEvent/GetEventById?Id=";

  public static DeleteEvent = AppConstants.BaseApiUrl + "ManageEvent/DeleteEvent";

  public static GetLocation = AppConstants.BaseApiUrl + "ManageEvent/GetLocation";

  public static GetProfiles = AppConstants.BaseApiUrl + "Profile/GetProfiles";

  public static GetTeamListById = AppConstants.BaseApiUrl + "Profile/GetTeamListById?Id=";

  public static GetUser = AppConstants.BaseApiUrl + "ManageEvent/GetUser";
  
}
