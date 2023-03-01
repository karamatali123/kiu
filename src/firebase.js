// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STROAGE_BUCKET } from "./constants/firebaseConfigConstants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STROAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db,app}
 