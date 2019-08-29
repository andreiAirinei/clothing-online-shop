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
  // For testint purposes 1
  const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  // For testint purposes 2
  const collectionSnapshot = await collectionRef.get();
  // For testint purposes 3
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

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

// We use this function whenever we want to add to firebase
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);
  // console.log(objectsToAdd);

  // we need to group ...?... internet connection something
  const batch = firestore.batch();

  // Loop through the array and batch these calls together
  objectsToAdd.forEach(obj => {
    // It is telling firebase: Give me a new document reference in this collection and randomly generate and ID for it
    // we can also pass the title if we want
    // e.g: const newDocRef = collectionRef.doc(obj.title); => Mens, Jackets...
    // BUT we want this ID to be unique
    const newDocRef = collectionRef.doc();
    // before: newDocRef.set, but now
    batch.set(newDocRef, obj);
  });

  // Fire off our batch request which returns a PROMISE
  // When commit succeeds, it will come back and resolve a void / null value
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();

    // return an object that represents the final object that we want
    // encodeURI - pass some string and it will return a string where any characters that URL can not handle (symbols, spaces) converted into a string that URL can actually read
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    };
  });

  // Transform the array into an object collection of objects with keys (hashmap)
  // {} - initial accumulator
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
