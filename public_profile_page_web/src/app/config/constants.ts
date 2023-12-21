export class Constants {
  public static readonly ALL_LANGUAGES = 'all-languages';
  public static readonly SELECT_LANGUAGES = 'select-languages';
  public static readonly AUTH_TOKEN = 'authToken';
  public static readonly AUTH_USER = 'authUser';

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
  public static readonly AMOUNT = '39900';
  public static readonly PAY_IMAGE = 'https://sarvm.ai/images/app/retailerlogo.png';
  public static readonly CURRENCY = 'INR';
  public static readonly APP_NAME = 'Sarvm';
  public static readonly APP_PRIMARY_COLOR = '#4db965';
}

export const EmailCheck = (email: string) => {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const PhoneCheck = (phone: string) => {
  let phoneRegex = /^\d{10}$/;
  let number: any = parseInt(phone);
  return phoneRegex.test(number);
};

export const ApiUrls = {
  sellerProfile: 'https://s3.ap-south-1.amazonaws.com/',
};
