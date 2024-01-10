// import Vue from 'vue';
// import { firebase } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// import 'firebase/database';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default {
  app,
  db
};
// export default app;
