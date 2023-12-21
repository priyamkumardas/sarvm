export class Constants {
  public static readonly ALL_LANGUAGES = 'all-languages';
  public static readonly SELECT_LANGUAGES = 'select-languages';
  public static readonly AUTH_TOKEN = 'admin-authToken';
  public static readonly AUTH_USER = 'admin-authUser';

  public static readonly FCM_TOKEN = 'fcmToken';

  public static readonly PRODUCT_DATA = 'productData';
  public static readonly SELLING_TYPE = 'sellingType';
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
  public static readonly CURRENCY = 'INR';
  public static readonly APP_PRIMARY_COLOR = '#4db965';
  //  static ORDER_STATUS: any;
  
  public static readonly ORDER_STATUS = {
    NEW : 1,
    ACCEPTED : 2,
    PROCESSING : 3,
    READY : 4,
    DISPATCH : 5,
    DELIVERED : 6,
    CANCELLED : 7,
    REJECTED : 8
  };

}

export const RegName:string="[a-zA-Z ]{3,30}";
export const RegPassword:string="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}";
export const RegEmail:string="[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}";
export const RegContact:string="([0-9]{10,12})";

export const EmailCheck = (email: string) => {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const PhoneCheck = (phone: any) => {
  let phoneRegex = /^\d{10}$/;
  let number: any = parseInt(phone);
  return phoneRegex.test(number);
};

export const ApiUrls = {
  splash: '/hms/apis/v1/households/splash',
  auth: {
    sendOtp: '/ums/apis/v1/users/send_otp',
    verifyOtp: '/ums/apis/v1/users/verify_otp',
  },
  addshop: '/rms/apis/v1/shop',
  // employee:'/ums/apis/v1/employee',
  employee:'/ums/apis/v1/employee/allEmp',
  order:'/hms/apis/v1/orders/',
  retailOrder:'/rms/apis/v1/orders/',
  kycDetailsUsingID:'/rms/apis/v1/shop/users/',
  catelog: '/rms/apis/v1/catalog/',
  retailerProfile:'/ums/apis/v1/users?userIds=',
  getAllSubscription: '/sub/apis/v1/subscription/',
  KYC_DETAILS:'/onbs/apis/v1/onboarding/retailer/kyc',
  createSubscription: '/sub/apis/v1/subscription/initiate',
  getKycDetailsByUserId: '/onbs/apis/v1/onboarding/retailer/kyc/kycDetails',
  confirmSubscription: '/sub/apis/v1/subscription/activate',
  getShopDetails: '/rms/apis/v1/shop',
  productdetails:{
    products:'/cms/apis/v1/product',
    productImage:'/cms/apis/v1/product/image',
    // productMapping:'/cms/apis/v1/product/mapping',
    productMapping :(product_id:any)=> `/cms/apis/v1/product/${product_id}/mapping`,
    syncproductApi : '/cms/apis/v1/product/sync',
    catalogTree : '/cms/apis/v1/metadata/mastercatalog',
    bulkUpdate : '/cms/apis/v1/product/bulk'
  },
  categorydetails:{
   categories:'/cms/apis/v1/category',
   categoryImage:'/cms/apis/v1/catalog/image'
},
catalogDetails:{
  catalog:'/cms/apis/v1/catalog',
  categoryImage:'/cms/apis/v1/catalog/image'
},
  getShopDetails2:'/rms/apis/v2/shop/',
  categoryDataTree:'/cms/apis/v1/dataTree',
  orderHistory:'/rms/apis/v1/orders?status=ALL',
  user: '/ums/apis/v1/users',
  retailer:'/ums/apis/v1/users?type=retailer',
  shop_DETAILS:'/rms/apis/v1/shop/retailerAndShop',
  payment_status:'/pmt/apis/v1/razorpay/payment/getPaymentStatus'
};
export interface selectedItems{
name:string,
children:selectedItems[];
}
