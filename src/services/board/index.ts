import { ObjectId } from 'mongodb'
import { LOOKUP_ADMINS, LOOKUP_COLUMNS, LOOKUP_MEMBERS, LOOKUP_CARDS, SHOW_USER } from '~/constants/aggregation'
import HTTP_STATUS from '~/constants/httpStatuss'
import { BOARD_MESSAGE } from '~/constants/messages'
import database from '~/databases'
import CustomError from '~/models/errors'
import BoardModel, { IBoardDetail } from '~/models/schemas/Board'
import { typeBoardUpdateOrderedColumn, typeBoardUpdateRequest } from '~/types/request'
import { mapOrder, orderedBoard } from '~/utils/sortOrderBoardDetail'

const boardService = {
  create: async ({ name, userId, cover_photo }: { name: string; userId: string; cover_photo: string }) => {
    const newBoard = new BoardModel({
      admins: [new ObjectId(userId)],
      members: [new ObjectId(userId)],
      cover_photo,
      name,
      columns: []
    })

    await database.boards.insertOne(newBoard)

    return newBoard
  },

  get: async (user_id: string) => {
    const boards = await database.boards.find({ members: new ObjectId(user_id) }).toArray()

    return boards
  },

  getDetail: async ({ board_id, user_id }: { user_id: string; board_id: string }) => {
    const [unprocessedTable, unprocessedColums] = await Promise.all([
      await database.boards.findOne({ _id: new ObjectId(board_id) }),
      await database.columns.find({ boardId: new ObjectId(board_id) }).toArray()
    ])

    const [board] = (await database.boards
      .aggregate(
        [
          {
            $match: {
              _id: new ObjectId(board_id),
              members: new ObjectId(user_id)
            }
          },
          {
            $lookup: LOOKUP_MEMBERS
          },
          {
            $lookup: LOOKUP_ADMINS
          },
          {
            $lookup: LOOKUP_COLUMNS
          },
          { $unwind: { path: '$columns' } },
          {
            $lookup: LOOKUP_CARDS
          },
          {
            $group: {
              _id: '$_id',
              name: { $first: '$name' },
              cover_photo: { $first: '$cover_photo' },
              members: { $first: '$members' },
              admins: { $first: '$admins' },
              created_at: { $first: '$created_ats' },
              update_at: { $first: '$update_at' },
              columns: {
                $push: {
                  _id: '$columns._id',
                  boardId: '$columns.boardId',
                  name: '$columns.name',
                  created_at: '$columns.created_at',
                  update_at: '$columns.update_at',
                  cards: '$columns.cards'
                }
              }
            }
          },
          {
            $project: {
              members: SHOW_USER,
              admins: SHOW_USER,
              columns: {
                cards: {
                  members: SHOW_USER
                }
              }
            }
          }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      )
      .toArray()) as [IBoardDetail]

    if (!unprocessedTable) {
      throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: BOARD_MESSAGE.NOT_FOUND })
    }

    const result = orderedBoard({ board, unprocessedTable, unprocessedColums })

    return result || {}
  },

  remove: async ({ board_id, user_id }: { user_id: string; board_id: string }) => {
    const board = await database.boards.findOne({ _id: new ObjectId(board_id) })

    if (!board) return

    if (board.admins.some((adminId) => adminId.equals(user_id))) {
      await database.boards.deleteOne({ _id: new ObjectId(board_id) })
    } else {
      const newMember = board.members.filter((memberId) => !memberId.equals(user_id))
      await database.boards.updateOne({ _id: new ObjectId(board_id) }, { members: newMember })
    }
  },

  updateOrderedColumns: async ({ boardId, columns }: typeBoardUpdateOrderedColumn) => {
    const newColumns = columns.map((column) => new ObjectId(column))

    await database.boards.findOneAndUpdate(
      { _id: new ObjectId(boardId) },
      { $set: { columns: newColumns, update_at: new Date() } },
      { returnDocument: 'after' }
    )
  },

  updateBoard: async ({ boardId, cover_photo, name }: typeBoardUpdateRequest) => {
    await database.boards.findOneAndUpdate({ _id: new ObjectId(boardId) }, { $set: { name, cover_photo } })
  }
}

export default boardService
