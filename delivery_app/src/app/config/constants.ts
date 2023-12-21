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

    public static readonly SUBSCRIPTION = 'logistics-subscrition';

    public static readonly SELECTED_PRODUCT = 'selected_product';
    public static readonly ACTIVE_SUBSCRIPTION_FLAG = 'logistics-subscrition';
    /* Pay */
    public static readonly AMOUNT = '39900';
    public static readonly PAY_IMAGE = 'https://sarvm.ai/images/Delivery-Logo%201.svg';
    public static readonly CURRENCY = 'INR';
    public static readonly APP_NAME = 'Sarvm';
    public static readonly APP_PRIMARY_COLOR = '#A42C24';
    public static readonly APP_ONLINE_OFFLINE = 'online-offline';

    public static readonly APP_LOCATION_TIMEOUT = 'location-timeout';
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
    auth: {
        sendOtp: '/ums/apis/v1/users/send_otp',
        verifyOtp: '/ums/apis/v1/users/verify_otp',
    },
    addshop: '/rms/apis/v1/shop',
    catelog: '/rms/apis/v1/catalog/',
    stores: '/hms/apis/v1/households/stores',
    category: '/hms/apis/v1/households/categories',
    addgst: 'rms/apis/v1/shop/:shopid/gst',
    getShopDetails: '/rms/apis/v1/shop/details',
    getGstDetails: '/rms/apis/v1/shop',
    updateShopDetails: '/rms/apis/v1/shop',
    
    
    createSubscription: '/sub/apis/v1/subscription/initiateV2',
    confirmSubscription: '/sub/apis/v1/subscription/activateV2',
    getAllSubscription: '/sub/apis/v1/subscription/V2/',
    checkStatus: '/sub/apis/v1/subscription/status/V2/',
    retailerCatalog: '/rms/apis/v1/catalog/',
    getAllOrders: '/oms/apis/v1/shop/',
    updateOrders: '/oms/apis/v1/shop/update/',
    orders: '/orders',
    SubscriptionsPackageList: '/sub/apis/s3/master',

    /* --------------LA App---------------- */
    /* for home */
    getTripDetailsByUser: '/lms/apis/v1/trip',
    patchToggleChangeStatus: '/lms/apis/v1/deliveryBoy/status',
    getDeliveryPersonInfo: '/lms/apis/v1/deliveryBoy',
    getUpdateDeliveryPersonLocation: '/lms/apis/v1/location',

    getDeliveryPreference: '/lms/apis/v1/deliveryPreference',
    updateDeliveryPreference: '/lms/apis/v1/deliveryPreference',
    
    getPresignedUrlForVehicleDoc: '/lms/apis/v1/document/url',
    postVehicleDocument: '/lms/apis/v1/document',
    getPaymentsInsights: '/lms/apis/v1/payment?timePeriod=',
    getTripHistory: '/lms/apis/v1/trip/history',
    newTripRequest: '/lms/apis/v1/trip/new',
    user: '/ums/apis/v1/users',
    image: '/ums/apis/v1/employee/upload',
    userProfile: '/lms/apis/v1/profile',
    profileUpload: '/ums/apis/v1/users/upload',
    qrCodeUpload: '/ums/apis/v1/users/QRcodeImage',
    getUserDetails: '/ums/apis/v1/users/',
    deliveryUpi: '/lms/apis/v1/payment/UPI',
    getDeleteDeliveryUpi: '/lms/apis/v1/payment/',
    retailerUpi: '/rms/apis/v1/retailers',

    /* for kyc */
    getAddUpdateKyc: '/lms/apis/v1/kyc',
    getpresignedUrlKyc: '/lms/apis/v1/kyc/url',

    /* for bank */
    addGetBank: '/lms/apis/v1/bank',
    getpresignedUrlBank: '/lms/apis/v1/bank/url',

    /* for order */
    getTripDetailsByTripId: '/lms/apis/v1/trip/detail/',
    updateTripDetailsByTripId: '/lms/apis/v1/trip/status/',
    updatePaymentStatus: '/lms/apis/v1/order/',
    updatePaymentStatusTrip: '/payment',

    /* delivery-options */
    addDeliveryCharges : '/lms/apis/v1/deliveryBoy/charges',
    getDeliveryCharges : '/lms/apis/v1/deliveryBoy',

    /* home page notification */
    getNotification : '/lms/apis/v1/notification/',

    /* Send Payment Reminder To Retailer */
    getSendPaymentReminder : '/lms/apis/v1/trip/reminder/',

};