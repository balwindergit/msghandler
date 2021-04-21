import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA4Au2C6LLQZNta3PioFxbVVH9bp55d49I",
  authDomain: "msghandler-71896.firebaseapp.com",
  databaseURL: "https://msghandler-71896-default-rtdb.firebaseio.com",
  projectId: "msghandler-71896",
  storageBucket: "msghandler-71896.appspot.com",
  messagingSenderId: "82720376499",
  appId: "1:82720376499:web:689ec2e84318f1b71712c6",
  measurementId: "G-KWRZ4X80JC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;