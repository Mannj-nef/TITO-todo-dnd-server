import { MongoClient } from 'mongodb'
import { MONGO } from '~/configs/envs'

const url = `mongodb+srv://${MONGO.USERNAME}:${MONGO.PASSWORD}@todo-dnd.73cmf8w.mongodb.net/`
const client = new MongoClient(url)

const connectDb = async () => {
  try {
    await client.connect()
    console.log('connect database successfully !!')
  } catch (error) {
    console.log(error)
  }
}

export default connectDb
