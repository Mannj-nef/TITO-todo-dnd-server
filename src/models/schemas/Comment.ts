import { ObjectId } from 'mongodb'

interface IComment {
  _id?: ObjectId
  userId: ObjectId
  cardId: ObjectId
  content: string
  created_at?: Date
  update_at?: Date
}

class CommentModel {
  _id?: ObjectId
  userId: ObjectId
  cardId: ObjectId
  content: string
  created_at: Date
  update_at: Date
  constructor(comment: IComment) {
    const date = new Date()

    this._id = comment._id
    this.userId = comment.userId
    this.cardId = comment.cardId
    this.content = comment.content
    this.created_at = comment.created_at || date
    this.update_at = comment.update_at || date
  }
}

export default CommentModel
