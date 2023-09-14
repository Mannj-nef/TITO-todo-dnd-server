import { ObjectId } from 'mongodb'
import database from '~/databases'
import CardModel, { typeCard } from '~/models/schemas/Card'
import UserModel from '~/models/schemas/User'
import { typeCardCreateRequest, typeCardUpdateRequest } from '~/types/request/card'

const cardService = {
  getDetail: async (cardId: string) => {
    const card = await database.cards.findOne({ _id: new ObjectId(cardId) })

    return card
  },

  create: async ({ cardPayload, user }: { cardPayload: typeCardCreateRequest; user: UserModel }) => {
    const cardId = new ObjectId()

    const newCard = new CardModel({
      _id: cardId,
      boardId: new ObjectId(cardPayload.boardId),
      columnId: new ObjectId(cardPayload.columnId),
      description: cardPayload.description,
      title: cardPayload.title,
      type: cardPayload.type,
      members: [user],
      imgUrl: ''
    })

    await database.columns.updateOne(
      {
        _id: new ObjectId(cardPayload.columnId)
      },
      {
        $push: { cards: cardId }
      }
    )

    await database.cards.insertOne(newCard)

    return newCard
  },

  update: async ({ cardId, payload }: { cardId: string; payload: typeCardUpdateRequest }) => {
    const card = await database.cards.findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      {
        $set: {
          description: payload.description,
          imgUrl: payload.imgUrl,
          title: payload.title,
          members: payload.members,
          type: payload.type
        }
      },
      {
        returnDocument: 'after'
      }
    )
    return card
  },

  remove: async (cardId: string) => {
    const card_id = new ObjectId(cardId)

    const column = await database.columns.findOne({ cards: card_id })

    const newCards = column?.cards.filter((card) => !card.equals(card_id))

    Promise.all([
      await database.cards.deleteOne({ _id: card_id }),
      await database.columns.updateOne({ cards: card_id }, { $set: { cards: newCards } })
    ])
  }
}

export default cardService
