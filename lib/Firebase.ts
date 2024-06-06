import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_API_KEY,
  authDomain: "sse-world.firebaseapp.com",
  projectId: "sse-world",
  storageBucket: "sse-world.appspot.com",
  messagingSenderId: "862129086688",
  appId: "1:862129086688:web:82b2b6ce69aba476943085",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
