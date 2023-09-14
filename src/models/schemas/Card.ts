import { ObjectId } from 'mongodb'
import UserModel from './User'

export enum typeCard {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger',
  warning = 'warning',
  success = 'success'
}

interface ICard {
  _id?: ObjectId
  columnId: ObjectId
  boardId: ObjectId
  title: string
  imgUrl: string
  description: string
  members: UserModel[]
  type: typeCard
  created_at?: Date
  update_at?: Date
}

class CardModel {
  _id?: ObjectId
  columnId: ObjectId
  boardId: ObjectId
  title: string
  imgUrl: string
  description: string
  members: UserModel[]
  type: typeCard
  created_at?: Date
  update_at?: Date

  constructor(card: ICard) {
    const date = new Date()

    this._id = card._id
    this.columnId = card.columnId
    this.boardId = card.boardId
    this.title = card.title
    this.imgUrl = card.imgUrl
    this.description = card.description
    this.members = card.members
    this.type = card.type || typeCard.default
    this.created_at = card.created_at || date
    this.update_at = card.update_at || date
  }
}

export default CardModel
