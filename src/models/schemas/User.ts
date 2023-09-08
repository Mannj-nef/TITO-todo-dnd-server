import { ObjectId } from 'mongodb'

export interface IUser {
  _id?: ObjectId
  email: string
  password: string
  dateOfBird: Date
  avatar?: string
  name?: string
  forgot_password_token?: string
  created_at?: Date
  update_at?: Date
}

class UserModel {
  _id?: ObjectId
  email: string
  password: string
  dateOfBird: Date
  avatar: string
  name: string
  forgot_password_token: string
  created_at: Date
  update_at: Date
  constructor(user: IUser) {
    const date = new Date()

    this._id = user._id
    this.email = user.email
    this.password = user.password
    this.avatar = user.avatar || ''
    this.dateOfBird = user.dateOfBird
    this.name = user.name || ''
    this.forgot_password_token = user.forgot_password_token || ''
    this.created_at = user.created_at || date
    this.update_at = user.update_at || date
  }
}

export default UserModel
