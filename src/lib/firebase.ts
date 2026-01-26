// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCr9ldymxqIMZ-pBzUPZucf_jFqHDqLw_8",
    authDomain: "portofolio-5510b.firebaseapp.com",
    projectId: "portofolio-5510b",
    storageBucket: "portofolio-5510b.firebasestorage.app",
    messagingSenderId: "465370946210",
    appId: "1:465370946210:web:e13ac8b518f4aa0e84d5fb",
    measurementId: "G-1ZYNMN0870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
