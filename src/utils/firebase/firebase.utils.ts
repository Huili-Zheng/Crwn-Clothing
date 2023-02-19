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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";

import {
  Category,
  CategoryDescription,
} from "../../store/categories/category.types";

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

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
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
    {} as Record<string, CategoryDescription[]>
  );
  return categoryDescriptionMap;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("erroe creating the user", error);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
