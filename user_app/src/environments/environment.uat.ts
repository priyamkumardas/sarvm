// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* DEV ENDPOINT */
//const SARVM_HOST_REFERRAL = 'http://43.205.9.141:1210/';
/* DEV ENDPOINT */

export const environment = {
    production: false,
    flyy_partner_id:'825c65368746ff077a01',
    flyy_env:'stage',
    flyy_theme:'#00a64f',
    flyy_ind_segment_id:"Household/Individual",
    flyy_emp_sso_segment_id:"Sales-Employee-SSO",
    flyy_emp_sh_segment_id:"Sales-Employee-SH",
    flyy_emp_co_segment_id:"Sales-Employee-CO",
    package_name:"com.sarvm.hh",
    //SARVM_HOST_REFERRAL :'http://43.205.9.141:1210/',http://43.205.9.141:1205
    //baseUrl: 'https://api.sarvm.ai',
    baseUrl: 'https://uat-api.sarvm.ai',
    app_name: 'householdApp',
    app_version_code: '101',
    unauthToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW1vdXMiLCJzY29wZSI6WyJob3VzZWhvbGRBcHAiXSwiaWF0IjoxNjk0MTYzNjYxLCJuYmYiOjE2OTQxNjM2NjEsImV4cCI6MTcyNTY5OTY2MSwiaXNzIjoic2Fydm06dW1zIiwic3ViIjoiYWNjZXNzVG9rZW4ifQ.jDjyEQmIEphtMSkRCVbdTLXVj_F57K_hnh-9paLLDdQ',
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
      ackPhonenumber:'08068862513',
      applink:'https://play.google.com/store/apps/details?id=com.sarvm.hh&hl=en-US&ah=uI6maScqUW8bclH7s_fV8-tJw58'
    },
    gMaps:{
      apiKey:'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc'
    },
    //sarvm all apps link
  sarvmAllApps: {
    publicPage: 'https://uat-biz.sarvm.ai/'
  }
    // api: {
    //   //baseUrl: 'http://auth-nlb-e953c9da3a44bec4.elb.ap-south-1.amazonaws.com',
    //   cdn: 'http://ec2-65-1-111-219.ap-south-1.compute.amazonaws.com:7777/apis/v1',
    //   cdn2: 'https://s3.ap-south-1.amazonaws.com/dev.sarvm.com',
    // },
    
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
  