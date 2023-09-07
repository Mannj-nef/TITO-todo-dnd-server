import { ObjectId } from 'mongodb'

export interface IRefreshToken {
  _id?: ObjectId
  refreshToken: string
  created_at?: Date
  user_id: ObjectId
  iat: number
  exp: number
}

class RefreshTokenModel {
  _id?: ObjectId
  token: string
  created_at?: Date
  user_id: ObjectId
  iat: Date
  exp: Date

  constructor(rfToken: IRefreshToken) {
    this._id = rfToken._id
    this.token = rfToken.refreshToken
    this.created_at = rfToken.created_at || new Date()
    this.user_id = rfToken.user_id
    this.iat = new Date(rfToken.iat * 1000)
    this.exp = new Date(rfToken.exp * 1000)
  }
}

export default RefreshTokenModel
