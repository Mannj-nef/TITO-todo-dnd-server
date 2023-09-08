import { ObjectId } from 'mongodb'

interface IColumn {
  _id?: ObjectId
  boardId: ObjectId
  name: string
  cards: string[]
  created_at?: Date
  update_at?: Date
}

class ColumnModel {
  _id?: ObjectId
  boardId: ObjectId
  name: string
  cards: string[]
  created_at: Date
  update_at: Date
  constructor(column: IColumn) {
    const date = new Date()

    this._id = column._id
    this.boardId = column.boardId
    this.name = column.name
    this.cards = column.cards
    this.created_at = column.created_at || date
    this.update_at = column.update_at || date
  }
}

export default ColumnModel
