import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB9BuhydPh-t3CtkZmIACHQsLWaydiAS3E",
    authDomain: "trybe-landing-68cb2.firebaseapp.com",
    projectId: "trybe-landing-68cb2",
    storageBucket: "trybe-landing-68cb2.firebasestorage.app",
    messagingSenderId: "407769710342",
    appId: "1:407769710342:web:b90ae793469ad078d02887"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
