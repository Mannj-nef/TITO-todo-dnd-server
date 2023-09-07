import { Collection, Db, MongoClient, MongoServerError } from 'mongodb'
import { MONGO } from '~/configs/envs'
import RefreshTokenModel from '~/models/schemas/RefreshToken'
import UserModel from '~/models/schemas/User'

const url = `mongodb+srv://${MONGO.USERNAME}:${MONGO.PASSWORD}@todo-dnd.73cmf8w.mongodb.net/`

class Database {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(url)
    this.db = this.client.db(MONGO.DB_NAME)
  }

  // connect
  connectDb = async () => {
    try {
      await this.client.connect()
      console.log('Connected successfully to server')
    } catch (error) {
      console.log(error)
    }
  }

  // collection
  get users(): Collection<UserModel> {
    return this.db.collection(MONGO.USER_COLLECTION)
  }
  get refreshToken(): Collection<RefreshTokenModel> {
    return this.db.collection(MONGO.REFRESH_TOKEN_COLLECTION)
  }
}

const database = new Database()
export default database
