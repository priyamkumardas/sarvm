export class Constants {
  public static readonly FCM_TOKEN = 'hh-fcmToken';
  public static readonly AUTH_TOKEN = 'hh-authToken';
  public static readonly AUTH_USER = 'hh-authUser';
  public static readonly PRODUCT_DATA = 'hh-productData';
  public static readonly VERSION_CONTROL = 'hh-version_control';
  public static readonly CART_DATA = 'hh-cartData';
  public static readonly ALL_LANGUAGES = 'hh-all-languages';
  public static readonly SELECT_LANGUAGES = 'hh-select-languages';
  public static readonly SELECT_PREFERENCE = 'hh-select-preference';
  public static readonly USER_LOCATION = 'hh-user-location';
  public static readonly USER_SAVED_LOCATION = 'hh-user-saved-location';
  public static readonly RECENT_LOCATION = 'hh-recent-location';
  public static readonly USER_Token_data = 'hh-user-data';
  public static readonly HOME_STORE = 'hh-home-data';
  public static readonly FAV_SHOPS = 'hh-fav-shops';
  public static readonly PROFILE_URL = 'profileUrl';
  public static readonly APP_LINK = 'https://play.google.com/store/apps/details?id=com.sarvm.hh&hl=en-US&ah=uI6maScqUW8bclH7s_fV8-tJw58';
  public static readonly ORDER_STATUS = {
    NEW : 1,
    ACCEPTED : 2,
    PROCESSING : 3,
    READY : 4,
    DISPATCHED : 5,
    PICKEDUP: 6,
    IN_TRANSIT: 7,
    DELIVERED : 8,
    COMPLETED : 9,
    REJECTED : 10,
    CANCELLED : 11,
    NO_SHOW : 12
  };
}

export const EmailCheck = (email) => {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const PhoneCheck = (phone) => {
  let phoneRegex = /^\d{10}$/;
  let number: any = parseInt(phone);
  return phoneRegex.test(number);
};

export const ApiUrls = {
  auth: {
    sendOtp: '/ums/apis/v1/users/send_otp',
    verifyOtp: '/ums/apis/v1/users/verify_otp',
  },
  stores: '/hms/apis/v1/households/stores',
  splash: '/hms/apis/v1/households/splash',
  category: '/hms/apis/v1/households/categories',
  employee:'/ums/apis/v1/employee',
  image: '/ums/apis/v1/employee/upload',
  profileUpload: '/ums/apis/v1/users/upload',
  order:'/hms/apis/v1/orders',
  user: '/ums/apis/v1/users',
  favourites:'/ums/apis/v1/favourite',
  organization:'/ums/apis/v1/organization'
};
