import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDBExCaGI2cqJCdBWGqQJ0Vpua1yFiw9R4",
  authDomain: "whatsapp-clone-3435d.firebaseapp.com",
  projectId: "whatsapp-clone-3435d",
  storageBucket: "whatsapp-clone-3435d.appspot.com",
  messagingSenderId: "895019269278",
  appId: "1:895019269278:web:3f53f7abc5790f1436cf8f"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const provider = new GoogleAuthProvider()

export default db
export {auth, provider}