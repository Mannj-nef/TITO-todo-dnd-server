import { Collection, Db, MongoClient, MongoServerError } from 'mongodb'
import { MONGO } from '~/configs/envs'
import BoardModel from '~/models/schemas/Board'
import CardModel from '~/models/schemas/Card'
import ColumnModel from '~/models/schemas/Column'
import RefreshTokenModel from '~/models/schemas/RefreshToken'
import UserModel from '~/models/schemas/User'

const uri = `mongodb+srv://${MONGO.USERNAME}:${MONGO.PASSWORD}@todo-dnd.73cmf8w.mongodb.net/`

class Database {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(MONGO.DB_NAME)
  }

  // connect
  connectDb = async () => {
    await this.client.connect()
    console.log('Connected successfully to MongoDB server')
  }

  // collection
  get users(): Collection<UserModel> {
    return this.db.collection(MONGO.USER_COLLECTION)
  }
  get refreshTokens(): Collection<RefreshTokenModel> {
    return this.db.collection(MONGO.REFRESH_TOKEN_COLLECTION)
  }
  get boards(): Collection<BoardModel> {
    return this.db.collection(MONGO.BOARD_COLLECTION)
  }
  get columns(): Collection<ColumnModel> {
    return this.db.collection(MONGO.COLUMN_COLLECTION)
  }
  get cards(): Collection<CardModel> {
    return this.db.collection(MONGO.CARD_COLLECTION)
  }
}

const database = new Database()
export default database
