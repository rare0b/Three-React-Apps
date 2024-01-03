import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZGuMV8E3M9dLs4YDZPVJnpA6Y2xgAvpo",
  authDomain: "blog-with-react-and-fire-617ce.firebaseapp.com",
  projectId: "blog-with-react-and-fire-617ce",
  storageBucket: "blog-with-react-and-fire-617ce.appspot.com",
  messagingSenderId: "913805196091",
  appId: "1:913805196091:web:1cdf7b41d72a7369e6951e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
