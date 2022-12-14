import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCJILPnvRuuIdBUDv4VFs4Pp5g88ki2FrU',
  authDomain: 'the-crib-51d5e.firebaseapp.com',
  projectId: 'the-crib-51d5e',
  storageBucket: 'the-crib-51d5e.appspot.com',
  messagingSenderId: '453425002828',
  appId: '1:453425002828:web:7751c76d5a7f529174b7e9',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
