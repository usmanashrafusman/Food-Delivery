const firebaseConfig = {
  apiKey: "AIzaSyA7O24TX7eWVyj5YgWiUzmxll6qmkCrqTU",
  authDomain: "food-deliverynewconfig.firebaseapp.com",
  projectId: "food-deliverynewconfig",
  storageBucket: "food-deliverynewconfig.appspot.com",
  messagingSenderId: "487089574310",
  appId: "1:487089574310:web:360625277eac33e1ef7f67",
  measurementId: "G-LE4TS6K350"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
