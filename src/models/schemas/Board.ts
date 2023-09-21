import { ObjectId } from 'mongodb'
import UserModel from './User'
import ColumnModel, { IColumndetail } from './Column'

export interface IBoard {
  _id?: ObjectId
  name: string
  columns: ObjectId[]
  members: ObjectId[]
  admins: ObjectId[]
  cover_photo: string
  created_at?: Date
  update_at?: Date
}

export interface IBoardDetail {
  _id: string
  name: string
  avatar?: string
  cover_photo?: string
  members: UserModel[]
  columns: IColumndetail[]
  admins: UserModel[]
}

class BoardModel {
  _id?: ObjectId
  name: string
  columns: ObjectId[]
  members: ObjectId[]
  admins: ObjectId[]
  cover_photo: string
  created_at: Date
  update_at: Date
  constructor(board: IBoard) {
    const date = new Date()

    this._id = board._id
    this.name = board.name
    this.columns = board.columns
    this.members = board.members
    this.admins = board.admins
    this.cover_photo = board.cover_photo
    this.created_at = board.created_at || date
    this.update_at = board.update_at || date
  }
}

export default BoardModel
