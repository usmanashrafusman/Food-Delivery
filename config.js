const firebaseConfig = {
    apiKey: "AIzaSyC8loxWl2ZDoRQvzAdSYsa3Yq1QiZvTxIg",
    authDomain: "food-delivery-23a6a.firebaseapp.com",
    projectId: "food-delivery-23a6a",
    storageBucket: "food-delivery-23a6a.appspot.com",
    messagingSenderId: "234810484833",
    appId: "1:234810484833:web:61e9ab2bf00330f5516220",
    measurementId: "G-NGERJBBEG7"
  };

  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();