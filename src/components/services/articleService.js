// This service completely hides the data store from the rest of the app.
// No other part of the app knows how the data is stored. If anyone wants
// to read or write data, they have to go through this service.

import { db } from '../../firebaseConfig'
import { collection, query, getDocs, addDoc, orderBy, limit, Timestamp } from 'firebase/firestore'


export async function createArticle({ title, body, displayName }) {
  const data = { title, body, displayName, date: Timestamp.now().toDate().toString() }
  const docRef = await addDoc(collection(db, 'articles'), data)
  return { id: docRef.id, ...data }
}

// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you implement pagination.
export async function fetchArticles() {
  const snapshot = await getDocs(
    query(collection(db, 'articles'), orderBy('date', 'asc'), limit(20))
  )
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}
