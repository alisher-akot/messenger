import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBVTG39l_e6x17MI1M6DsGNvk35LuhYx3E",
    authDomain: "messenger-2cda3.firebaseapp.com",
    projectId: "messenger-2cda3",
    storageBucket: "messenger-2cda3.appspot.com",
    messagingSenderId: "789055062827",
    appId: "1:789055062827:web:0a76efe72ed9b199c4fb6e"
  }).auth();