import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAQkiwyxJzEDAxenvG527q6RXeWvy0NJuw",
    authDomain: "linkedin-clone-2faac.firebaseapp.com",
    projectId: "linkedin-clone-2faac",
    storageBucket: "linkedin-clone-2faac.appspot.com",
    messagingSenderId: "129810610588",
    appId: "1:129810610588:web:4fc898c4f467e9254bb059"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider()
const storage = getStorage(firebaseApp)

export { auth, provider, storage }
export default db
