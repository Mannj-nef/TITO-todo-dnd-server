import { ObjectId } from 'mongodb'
import database from '~/databases'
import ColumnModel from '~/models/schemas/Column'
import { typeColumnCreate, typeColumnUpdateCards, typeUpdateCardsBetweenColumnDifferent } from '~/types/request/columns'

const columnService = {
  create: async ({ boardId, columnName }: typeColumnCreate) => {
    const columnId = new ObjectId()

    const newColumn = new ColumnModel({
      boardId: new ObjectId(boardId),
      name: columnName,
      _id: columnId
    })

    await database.boards.updateOne(
      { _id: new ObjectId(boardId) },
      {
        $push: { columns: columnId }
      }
    )

    await database.columns.insertOne(newColumn)

    return newColumn
  },

  updateCard: async ({ columnId, cards }: typeColumnUpdateCards) => {
    const newCards = cards.map((card) => new ObjectId(card))

    await database.columns.findOneAndUpdate(
      { _id: new ObjectId(columnId) },
      { $set: { cards: newCards } },
      { returnDocument: 'after' }
    )
  },

  updateCardBetweenDiffColumn: async (payload: typeUpdateCardsBetweenColumnDifferent) => {
    const { cardActiveId, cards, newColumnId, oldColumnId } = payload

    const newCardIds = cards.map((card) => new ObjectId(card))

    const oldColumn = await database.columns.findOne({ _id: new ObjectId(oldColumnId) })
    const newCardsInOldColumn = oldColumn?.cards.filter((card) => !card.equals(cardActiveId))

    Promise.all([
      await database.columns.findOneAndUpdate(
        { _id: new ObjectId(oldColumnId) },
        { $set: { cards: newCardsInOldColumn } }
      ),

      await database.columns.findOneAndUpdate({ _id: new ObjectId(newColumnId) }, { $set: { cards: newCardIds } })
    ])
  },

  remove: async (columnId: string) => {
    const column_id = new ObjectId(columnId)

    const board = await database.boards.findOne({ columns: column_id })

    const newColumns = board?.columns.filter((item) => !item.equals(columnId))

    Promise.all([
      await database.columns.deleteOne({ _id: column_id }),
      await database.cards.deleteMany({ columnId: column_id }),
      await database.boards.updateOne({ columns: column_id }, { $set: { columns: newColumns } })
    ])
  }
}

export default columnService
