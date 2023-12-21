

export const environment = {
  production: false,
  //baseUrl: 'https://api.sarvm.ai',
  // baseUrl: 'https://uat-api.sarvm.ai',
baseUrl: 'https://dev-api.sarvm.ai',
  
  app_name: 'retailerApp',
  app_version_code: '101',
  unauthToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW1vdXMiLCJzY29wZSI6WyJob3VzZWhvbGRBcHAiXSwiaWF0IjoxNjYyNTY5MDQ5LCJuYmYiOjE2NjI1NjkwNDksImV4cCI6MTY5NDEwNTA0OSwiaXNzIjoic2Fydm06dW1zIiwic3ViIjoiYWNjZXNzVG9rZW4ifQ.bi9wcybzu1CE23JQ835gQwBh5DMyKiYejGZEgXC0V3M',
  app_primary_color_code:'#10BAB2',
  app_name_test:'SarvM Retailer',

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
  flyy_segment_id:"Retailer",
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
  }
};


