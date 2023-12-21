// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  baseUrl: 'https://dev-api.sarvm.ai',
  env_name:"Dev",
  // baseUrl: 'https://uat-api.sarvm.ai',
  // env_name:"UAT",
  app_name: 'logisticsDelivery',
  app_version_code: '101',
  //unauthToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW1vdXMiLCJzY29wZSI6WyJob3VzZWhvbGRBcHAiXSwiaWF0IjoxNjYyNTY5MDQ5LCJuYmYiOjE2NjI1NjkwNDksImV4cCI6MTY5NDEwNTA0OSwiaXNzIjoic2Fydm06dW1zIiwic3ViIjoiYWNjZXNzVG9rZW4ifQ.bi9wcybzu1CE23JQ835gQwBh5DMyKiYejGZEgXC0V3M',
  unauthToken:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW1vdXMiLCJzY29wZSI6WyJob3VzZWhvbGRBcHAiXSwiaWF0IjoxNjk0MTYzNjYxLCJuYmYiOjE2OTQxNjM2NjEsImV4cCI6MTcyNTY5OTY2MSwiaXNzIjoic2Fydm06dW1zIiwic3ViIjoiYWNjZXNzVG9rZW4ifQ.jDjyEQmIEphtMSkRCVbdTLXVj_F57K_hnh-9paLLDdQ',
  app_primary_color_code:'#10BAB2',
  app_name_test:'SarvM Logistics',

  razorpay:{
    //razorpay_key:'rzp_test_QAwfFykXGl8GCf', // pg sarvm RA subscription
    //razorpay_key:'rzp_test_0vAJP6hBwM3yB1', // hclodwal hha
    razorpay_key:'rzp_live_V2pyoZIaso7wD2',
    //razorpay_key_secret: 'xzNT0T7Qveg1nb2O62pGPeMX',
    razorpay_amount: '39900',
  },
  
  //flyyy
  flyy_partner_id:'825c65368746ff077a01',
  flyy_env:'stage',
  flyy_theme:'#00a64f',
  flyy_segment_id:"logistics_delivery",
  package_name:"com.sarvm.hh",
  ////

  firebaseConfig:{
    apiKey: "AIzaSyBGm_-riMVAns28aPWQwXskYNO3jd-IfCE",
    authDomain: "sarvm-ai.firebaseapp.com",
    projectId: "sarvm-ai",
    storageBucket: "sarvm-ai.appspot.com",
    messagingSenderId: "134890018866",
    appId: "1:134890018866:web:2b4cbd77630bbeee13442b",
    measurementId: "G-XCSSD0DLVK"
  },

  refferal:{
    ackPhonenumber:'080 6886 2513',
  },

  gMaps:{
    apiKey:'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc'
  },

  stateList: [
    {
      "key": "AN",
      "name": "Andaman and Nicobar Islands"
    },
    {
      "key": "AP",
      "name": "Andhra Pradesh"
    },
    {
      "key": "AR",
      "name": "Arunachal Pradesh"
    },
    {
      "key": "AS",
      "name": "Assam"
    },
    {
      "key": "BR",
      "name": "Bihar"
    },
    {
      "key": "CG",
      "name": "Chandigarh"
    },
    {
      "key": "CH",
      "name": "Chhattisgarh"
    },
    {
      "key": "DH",
      "name": "Dadra and Nagar Haveli"
    },
    {
      "key": "DD",
      "name": "Daman and Diu"
    },
    {
      "key": "DL",
      "name": "Delhi"
    },
    {
      "key": "GA",
      "name": "Goa"
    },
    {
      "key": "GJ",
      "name": "Gujarat"
    },
    {
      "key": "HR",
      "name": "Haryana"
    },
    {
      "key": "HP",
      "name": "Himachal Pradesh"
    },
    {
      "key": "JK",
      "name": "Jammu and Kashmir"
    },
    {
      "key": "JH",
      "name": "Jharkhand"
    },
    {
      "key": "KA",
      "name": "Karnataka"
    },
    {
      "key": "KL",
      "name": "Kerala"
    },
    {
      "key": "LD",
      "name": "Lakshadweep"
    },
    {
      "key": "MP",
      "name": "Madhya Pradesh"
    },
    {
      "key": "MH",
      "name": "Maharashtra"
    },
    {
      "key": "MN",
      "name": "Manipur"
    },
    {
      "key": "ML",
      "name": "Meghalaya"
    },
    {
      "key": "MZ",
      "name": "Mizoram"
    },
    {
      "key": "NL",
      "name": "Nagaland"
    },
    {
      "key": "OR",
      "name": "Odisha"
    },
    {
      "key": "PY",
      "name": "Puducherry"
    },
    {
      "key": "PB",
      "name": "Punjab"
    },
    {
      "key": "RJ",
      "name": "Rajasthan"
    },
    {
      "key": "SK",
      "name": "Sikkim"
    },
    {
      "key": "TN",
      "name": "Tamil Nadu"
    },
    {
      "key": "TS",
      "name": "Telangana"
    },
    {
      "key": "TR",
      "name": "Tripura"
    },
    {
      "key": "UK",
      "name": "Uttar Pradesh"
    },
    {
      "key": "UP",
      "name": "Uttarakhand"
    },
    {
      "key": "WB",
      "name": "West Bengal"
    }
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
