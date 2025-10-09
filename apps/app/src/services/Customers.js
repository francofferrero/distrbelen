import FirestoreService from './firestore'
import { CUSTOMERS as COLLECTION } from '@/constants/collections'

export default class CustomersService extends FirestoreService {
  static collection = COLLECTION
}
