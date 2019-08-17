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

// Function will allow us to take that user object from Authentication library and then store inside of our database
// Async
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if there is no user authentication then exit from this function
  if (!userAuth) return;
  // else do
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // Check if the user from Auth library does not exist in the firestore database
  if (!snapShot.exists) {
    // get what data we actually want to store in db
    // destructure from the giant object
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // try and catch block because we are doing an ASYNC request to actually store this data
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  // console.log(userAuth);
  // console.log(snapShot);

  // Always return us our userRef as we may need to do something else with it
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
