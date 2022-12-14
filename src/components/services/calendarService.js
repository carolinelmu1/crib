// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from '../../firebaseConfig'
import { collection, query, getDocs, orderBy, limit, deleteDoc, doc } from 'firebase/firestore'

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

export async function deleteCalendarEvent(id) {
  await deleteDoc(doc(db, 'events', id))
}
