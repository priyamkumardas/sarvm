// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* DEV ENDPOINT */
//const SARVM_HOST_REFERRAL = 'http://43.205.9.141:1210/';
/* DEV ENDPOINT */

export const environment = {
  production: false,
  baseUrl: 'https://dev-api.sarvm.ai',
  app_name: 'admin',
  app_version_code: '101',
  unauthToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzVmNjdmY2U5NWEyZjE4NGYyMzQ4NDEiLCJwaG9uZSI6Ijg5Nzc1ODc3MjkiLCJ1c2VyVHlwZSI6IlJFVEFJTEVSIiwic2hvcElkIjoxMTQsInNob3BVbmlxdWVJZCI6IjUyNjcxMDc0MDkiLCJzaG9wTWV0YSI6eyJzaG9wIjp7InNob3BfaWQiOjExNCwidXNlcl9pZCI6IjYzNWY2N2ZjZTk1YTJmMTg0ZjIzNDg0MSIsInNob3BfbmFtZSI6InRlc3Qgc2hvcCB2aXNha2hhIFZWIiwibG9uZ2l0dWRlIjo4My4zMDMyODA0NzUsImxhdGl0dWRlIjoxNy43MTg1MDY5MTI1LCJzaG9wX251bWJlciI6IjI1IiwibG9jYWxpdHkiOiJlbmNsYXZlNSIsImxhbmRtYXJrIjoiQXBvbGxvIFBoYXJtYWN5ICIsImNpdHkiOiJWaXNha2hhcGF0bmFtICIsInN0cmVldCI6InN0cmVldCIsInZlZyI6bnVsbCwiZGVsaXZlcnkiOm51bGwsImltYWdlIjpudWxsLCJ0eXBlX29mX3JldGFpbGVyIjpudWxsLCJHU1Rfbm8iOm51bGwsImlzU3Vic2NyaWJlZCI6dHJ1ZSwiaXNLWUNWZXJpZmllZCI6bnVsbCwic2VsbGluZ190eXBlIjoiZmFsc2UiLCJwaW5jb2RlIjo1MzAwMjAsImNyZWF0ZWRfYXQiOiIyMDIyLTEyLTA1VDA2OjI3OjE1LjkzMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMi0wNVQwNjoyNzoxNS45MzBaIiwiaWQiOiI1MjY3MTA3NDA5Iiwic3RhdGUiOm51bGwsInJlZ2lvbiI6bnVsbCwibWFuYWdlcl9pZCI6bnVsbH0sImZsYWciOnsib25Cb2FyZGluZyI6ZmFsc2UsImlzU3Vic2NyaWJlZCI6dHJ1ZSwiR1NUX25vIjpmYWxzZSwiaXNLWUNWZXJpZmllZCI6ZmFsc2V9fSwic2VnbWVudElkIjoicmV0YWlsZXIiLCJmbHl5VXNlcklkIjoicmV0YWlsZXItYTlmNzA4ZDktOTE3OC00MzM0LTg5NzEtYWJmMGRiNmU1Y2ViIiwic2NvcGUiOlsiVXNlcnMiLCJyZXRhaWxlckFwcCJdLCJpYXQiOjE2NzEyMTc3NzksIm5iZiI6MTY3MTIxNzc3OSwiZXhwIjoxNzAyNzUzNzc5LCJpc3MiOiJzYXJ2bTp1bXMiLCJzdWIiOiJhY2Nlc3NUb2tlbiJ9.IgxJ9Prfq9rkEj77Em-Sh_WBUe9HocJwsHiNmqJgoS0',
 
  // unauthToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhbm9ueW1vdXMiLCJzY29wZSI6WyJob3VzZWhvbGRBcHAiXSwiaWF0IjoxNjYyNTY5MDQ5LCJuYmYiOjE2NjI1NjkwNDksImV4cCI6MTY5NDEwNTA0OSwiaXNzIjoic2Fydm06dW1zIiwic3ViIjoiYWNjZXNzVG9rZW4ifQ.bi9wcybzu1CE23JQ835gQwBh5DMyKiYejGZEgXC0V3M',
  
  
};

/* {{gateway}}/ums/apis/v1/employee/?onlyManagers=true
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
