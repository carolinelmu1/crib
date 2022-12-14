// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from '../../firebaseConfig'
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'

export async function createCalendar({ title, body }) {
  const data = { title, body, date: Timestamp.now().toDate().toString() }
  const docRef = await addDoc(collection(db, 'calendar'), data)
  return { id: docRef.id, ...data }
}

// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you implement pagination.
export async function fetchCalendar() {
  const snapshot = await getDocs(
    query(collection(db, 'events'), orderBy('start', 'desc'), limit(20))
  )
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export async function deleteCalendar(id) {
  await deleteDoc(doc(db, 'calendar', id))
}
