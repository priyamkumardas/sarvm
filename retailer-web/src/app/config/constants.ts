

export class Constants {
  public static readonly ALL_LANGUAGES = 'all-languages';
  public static readonly SELECT_LANGUAGES = 'select-languages';
  public static readonly AUTH_TOKEN = 'authToken';
  public static readonly AUTH_USER = 'authUser';

  public static readonly FCM_TOKEN = 'fcmToken';

  public static readonly PRODUCT_DATA = 'productData';
  public static readonly SELLING_TYPE = 'sellingType';
  public static readonly PROFILE_URL = 'profileUrl';
  public static readonly SELECT_PREFERENCE = 'select-preference';
  public static readonly SELECT_CITY = 'select-city';
  public static readonly SELECTED_CATEGORIES = 'selectedCategories';
  public static readonly SHOP_ADDRESS = 'shop-address';
  public static readonly SHOP_ID = 'shop-id';
  public static readonly SHOP_GST = 'shop-gst';
  public static readonly KYC_DETAILS = 'kycDetails';
  public static readonly BANK_DETAILS = 'bankDetails';
  public static readonly WORKING_HOURS = 'working-hours';

  public static readonly SUBSCRIPTION = 'retailer-subscrition';

  public static readonly SELECTED_PRODUCT = 'selected_product';

  /* Pay */
  public static readonly AMOUNT = '39900';
  public static readonly PAY_IMAGE = 'https://sarvm.ai/images/app/retailerlogo.png';
  public static readonly CURRENCY = 'INR';
  public static readonly APP_NAME = 'Sarvm';
  public static readonly APP_PRIMARY_COLOR = '#4db965';
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
  splash: '/rms/apis/v1/splash',
  catalog: {
    catelog: '/rms/apis/v1/catalog/',
    category: '/hms/apis/v1/households/categories',
    stores: '/hms/apis/v1/households/stores',
    retailerCatalog: '/rms/apis/v1/catalog/',
  },
  topCustomerReport: {
    existingCustomers: '/report/apis/v1/report/top-customer-report/',
    customerDetail: '/report/apis/v1/report/user-detailed-orders/',
  },
  auth: {
    sendOtp: '/ums/apis/v1/users/send_otp',
    verifyOtp: '/ums/apis/v1/users/verify_otp',
  },
  addshop: '/rms/apis/v1/shop',
  catelog: '/rms/apis/v1/catalog/',
  stores: '/hms/apis/v1/households/stores',
  user: '/ums/apis/v1/users',
  image: '/ums/apis/v1/employee/upload',
  category: '/hms/apis/v1/households/categories',
  addgst: 'rms/apis/v1/shop/:shopid/gst',
  getShopDetails: '/rms/apis/v1/shop/details',
  sellerProfile: 'https://uat-static.sarvm.ai/retailer/',
  getGstDetails: '/rms/apis/v1/shop',
  updateShopDetails: '/rms/apis/v1/shop',
  getBankURLDOC: '/onbs/apis/v1/onboarding/retailer/bank/uploadfile',
  addBank: '/onbs/apis/v1/onboarding/retailer/bank',
  createSubscription: '/sub/apis/v1/subscription/initiate',
  confirmSubscription: '/sub/apis/v1/subscription/activate',
  getAllSubscription: '/sub/apis/v1/subscription/',
  checkStatus: '/sub/apis/v1/subscription/status/',
  retailerCatalog: '/rms/apis/v1/catalog/',
  getKycDetails: '/onbs/apis/v1/onboarding/retailer/kyc',
  getAllOrders: '/oms/apis/v1/shop/',
  updateOrders: '/oms/apis/v1/shop/update/',
  orders: '/orders',
  profileUpload: '/ums/apis/v1/users/upload',
  getShopOwnerDetails: '/rms/apis/v2/shop/',
  getDboyList: "/rms/apis/v1/shop/delivery",
  assignOrder: (orderId: any) => `/rms/apis/v1/orders/assign/${orderId}`,
  reAssignOrder: (orderId: any) => `/rms/apis/v1/orders/reAssign/${orderId}`,
};


