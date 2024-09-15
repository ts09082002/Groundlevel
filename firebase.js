import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAC_-nCyQyTyYqslxSPars_9c3f3e2P4HQ",
    authDomain: "login-register-web.firebaseapp.com",
    projectId: "login-register-web",
    storageBucket: "login-register-web.appspot.com",
    messagingSenderId: "225684385923",
    appId: "1:225684385923:web:75e18bb0563013123aabb6",
    measurementId: "G-EHHKNWJT9B"
};

const app = initializeApp(firebaseConfig);
export const imagedb = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
