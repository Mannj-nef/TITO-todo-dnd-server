import { ObjectId } from 'mongodb'

export enum typeCard {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger',
  warning = 'warning',
  success = 'success'
}

interface ICard {
  _id: ObjectId
  columnId: ObjectId
  boardId: ObjectId
  name: string
  imgUrl: string
  contents: string
  members: string[]
  type: typeCard
  created_at: Date
  update_at: Date
}

class CardModel {
  _id?: ObjectId
  columnId: ObjectId
  boardId: ObjectId
  name: string
  imgUrl: string
  contents: string
  members: string[]
  type: typeCard
  created_at?: Date
  update_at?: Date

  constructor(card: ICard) {
    const date = new Date()

    this._id = card._id
    this.columnId = card.columnId
    this.boardId = card.boardId
    this.name = card.name
    this.imgUrl = card.imgUrl
    this.contents = card.contents
    this.members = card.members
    this.type = card.type
    this.created_at = card.created_at || date
    this.update_at = card.update_at || date
  }
}

export default CardModel
