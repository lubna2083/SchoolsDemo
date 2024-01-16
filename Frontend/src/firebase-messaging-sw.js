importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyAN69tjJJBBYWEOrMllgEfxIOvlEQdvDlc",
  authDomain: "fierbace-erp.firebaseapp.com",
  projectId: "fierbace-erp",
  storageBucket: "fierbace-erp.appspot.com",
  messagingSenderId: "8516212732",
  appId: "1:8516212732:web:ca1f6ba8d69c38bcb44479"
});


const messaging = firebase.messaging();

