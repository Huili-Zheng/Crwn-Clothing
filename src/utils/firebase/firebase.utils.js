import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi92B5j-Hhj5M4wD-JWhIRgo_hOyoPsSI",
  authDomain: "crwn-clothing-db-1bcab.firebaseapp.com",
  projectId: "crwn-clothing-db-1bcab",
  storageBucket: "crwn-clothing-db-1bcab.appspot.com",
  messagingSenderId: "402116242443",
  appId: "1:402116242443:web:724b5afb2de58e81f56b0e",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvide = new GoogleAuthProvider();
googleProvide.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvide);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvide);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getCategoryDescriptionAndDocuments = async () => {
  const categoryDescriptionRef = collection(db, "categoryDescription");
  const q = query(categoryDescriptionRef);

  const querySnapshot = await getDocs(q);
  const categoryDescriptionMap = querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, id, imageUrl } = docSnapshot.data();
      acc[title.toLowerCase()] = [{ id, title, imageUrl }];
      return acc;
    },
    {}
  );
  return categoryDescriptionMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("erroe creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubcribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
