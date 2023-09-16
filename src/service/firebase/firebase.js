// src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDriFS6tFVdIE43tVjlMbfufp5C9Weknjc",
    authDomain: "farmwise-vitereact.firebaseapp.com",
    projectId: "farmwise-vitereact",
    storageBucket: "farmwise-vitereact.appspot.com",
    messagingSenderId: "606182611461",
    appId: "1:606182611461:web:995c3e7af5dae381fcda6c"
};

const app = initializeApp(firebaseConfig);

export default app;
