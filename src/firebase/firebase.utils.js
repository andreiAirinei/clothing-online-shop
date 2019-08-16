import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC9_7V2STJIowRGM1xiISF0L4ZX1_PTpjM',
  authDomain: 'clothing-shop-8e2d2.firebaseapp.com',
  databaseURL: 'https://clothing-shop-8e2d2.firebaseio.com',
  projectId: 'clothing-shop-8e2d2',
  storageBucket: '',
  messagingSenderId: '40013404491',
  appId: '1:40013404491:web:2121df10dd6272bb'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
