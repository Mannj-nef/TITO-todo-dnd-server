import BoardModel from './models/schemas/Board'
import UserModel from './models/schemas/User'
import { TokenPayload } from './types/request/token'

declare module 'express' {
  interface Request {
    user?: UserModel
    decoded_token?: TokenPayload
    newBoard?: BoardModel
  }
}
