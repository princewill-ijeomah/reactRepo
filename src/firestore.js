import firebase from "@firebase/app";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyCpncPiyY9y5ppaey_vyp5tU1Eru1znhL4",
  authDomain: "localhost",
  databaseURL: "https://user-reg-90610.firebaseio.com",
  projectId: "user-reg-90610",
  storageBucket: "",
  messagingSenderId: "781083501569"
};

const app = firebase.initializeApp(config);
const firestore = firebase.firestore(app);

export default firestore;
