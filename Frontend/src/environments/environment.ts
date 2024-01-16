// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api',
  firebaseConfig :{
    apiKey: "AIzaSyAN69tjJJBBYWEOrMllgEfxIOvlEQdvDlc",
    authDomain: "fierbace-erp.firebaseapp.com",
    projectId: "fierbace-erp",
    storageBucket: "fierbace-erp.appspot.com",
    messagingSenderId: "8516212732",
    appId: "1:8516212732:web:ca1f6ba8d69c38bcb44479"
  },
  cookieDomain: 'localhost'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
