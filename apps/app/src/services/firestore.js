import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/helpers/firebase'

export default class FirestoreService {
  static collection = '' // Sobreescribir en clases que heredan
  options = {}

  constructor(options) {
    this.options = options
  }

  async create(data) {
    const colRef = collection(db, this.collection)
    return await addDoc(colRef, { ...data })
  }

  async readAll() {
    const colRef = collection(db, this.collection)

    return await getDocs(colRef)
  }

  async read(id) {
    const docRef = doc(db, this.collection, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()

    return null
  }

  async update(id, data) {
    const docRef = doc(db, this.collection, id)
    const res = setDoc(docRef, { ...data }, { merge: true })
    return res
  }

  async delete(id) {
    return await this.update(id, { deletedAt: Timestamp.fromDate(new Date()) })
  }

  get collection() {
    return this.constructor.collection
  }
}
