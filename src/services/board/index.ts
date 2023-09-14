import { ObjectId } from 'mongodb'
import { LOOKUP_ADMINS, LOOKUP_COLUMNS, LOOKUP_MEMBERS, LOOKUP_CARDS, SHOW_USER } from '~/constants/aggregation'
import database from '~/databases'
import BoardModel from '~/models/schemas/Board'

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

  getDetail: async ({ board_id, user_id }: { user_id: string; board_id: string }) => {
    const [board] = await database.boards
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
      .toArray()

    return board
  }
}

export default boardService
