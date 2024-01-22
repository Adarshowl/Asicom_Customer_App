import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  databaseURL: 'https://ecom-test-54124-default-rtdb.firebaseio.com',
  apiKey: 'AIzaSyAsC420nKk8hESbZgtZGX4IJFeoeeoDOSA',
  authDomain: 'ecom-test-54124.firebaseapp.com',
  projectId: 'ecom-test-54124',
  storageBucket: 'ecom-test-54124.appspot.com',
  messagingSenderId: '391845934469',
  appId: '1:391845934469:web:19874824cc1b653a3780ec',
  measurementId: 'G-9X4RB3C78E',
};

export const firebaseApp = await initializeApp(firebaseConfig);
