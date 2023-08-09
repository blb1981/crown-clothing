import { initializeApp } from 'firebase/app'
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkIYUeAHTHGQRxP5WbB15XXXDKwQFz680',
  authDomain: 'crown-clothing-db-27257.firebaseapp.com',
  projectId: 'crown-clothing-db-27257',
  storageBucket: 'crown-clothing-db-27257.appspot.com',
  messagingSenderId: '502061024773',
  appId: '1:502061024773:web:a2ef883e1780061facfe6c',
}

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig)
initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  // See if there is an existing user document
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  // If user does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (error) {
      console.log('error createing the user', error.message)
    }
  }

  // return user
  return userDocRef
}
