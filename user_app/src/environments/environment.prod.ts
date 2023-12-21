/* DEV ENDPOINT */
//const SARVM_HOST_REFERRAL = 'http://43.205.9.141:1210/';
/* DEV ENDPOINT */

export const environment = {
  production: true,
  flyy_partner_id:'b1d0515332041aea57d4',
  flyy_env:'production',
  flyy_theme:'#00a64f',
  flyy_ind_segment_id:"Household/Individual",
  flyy_emp_segment_id:"Eales-Employee-SSO",
  package_name:"com.sarvm.hh",
  baseUrl: 'https://api.sarvm.ai',
  // baseUrl: 'https://uat-api.sarvm.ai',
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
    ackPhonenumber:'08068862511',
    applink:'https://play.google.com/store/apps/details?id=com.sarvm.hh&hl=en-US&ah=uI6maScqUW8bclH7s_fV8-tJw58&pli=1'
  },
  gMaps:{
    apiKey:'AIzaSyB3mLu1YhKFrjGO5JnQtNYekBq47DOOTcc'
  },
  //sarvm all apps link
  sarvmAllApps: {
    publicPage: 'https://biz.sarvm.ai/'
  }
  // api: {
  //   baseUrl: 'http://43.205.9.141:1207',
  //   cdn: 'http://ec2-65-1-111-219.ap-south-1.compute.amazonaws.com:7777/apis/v1',
  //   cdn2: 'https://s3.ap-south-1.amazonaws.com/dev.sarvm.com',
  // },
  //SARVM_HOST_REFERRAL : 'http://43.205.9.141:1210/',
  // referral_mgmt: {
  //   referralInvite: SARVM_HOST_REFERRAL + 'ref_ms/apis/v1/ref/invite',
  //   referrals: SARVM_HOST_REFERRAL + 'ref_ms/apis/v1/ref',
  //   referralReminder: SARVM_HOST_REFERRAL + 'ref_ms/apis/v1/ref/sendReminder',
  // },
};
