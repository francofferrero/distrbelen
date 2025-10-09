import FirestoreService from './firestore'
import { USERS as COLLECTION } from '@/constants/collections'

export default class UsersService extends FirestoreService {
  static collection = COLLECTION
}
