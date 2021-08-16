import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBGxPJwCHawBzWZBpoh7mXkX3z0mQdZYDg',
  authDomain: 'stock-app-71e53.firebaseapp.com',
  projectId: 'stock-app-71e53',
  storageBucket: 'stock-app-71e53.appspot.com',
  messagingSenderId: '670709646286',
  appId: '1:670709646286:web:acdd69aa3348033c3a219f',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
