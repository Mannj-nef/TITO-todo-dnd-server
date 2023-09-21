import { checkSchema } from 'express-validator'
import { typeGetBoardDetail } from '../types'
import validate from '~/utils/validate'
import boardSchema from '../schema'
import database from '~/databases'
import { ObjectId } from 'mongodb'
import CustomError from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatuss'
import { BOARD_MESSAGE } from '~/constants/messages'
import { LOOKUP_ADMINS, LOOKUP_COLUMNS, LOOKUP_MEMBERS, SHOW_USER } from '~/constants/aggregation'
import ColumnModel from '~/models/schemas/Column'

const getBoardDetail: typeGetBoardDetail = {
  boarsId: {
    ...boardSchema._id,
    custom: {
      options: async (value, { req }) => {
        const boardId = new ObjectId(`${req.params?.boarsId}`)
        const userId = new ObjectId(`${req.decoded_token.user_id}`)

        const [board] = await database.boards
          .aggregate(
            [
              {
                $match: {
                  _id: boardId,
                  members: userId
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
              {
                $project: {
                  members: SHOW_USER,
                  admins: SHOW_USER
                }
              }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
          )
          .toArray()

        if (!board) {
          throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: BOARD_MESSAGE.NOT_FOUND })
        }

        if (!board.columns?.length) {
          req.newBoard = board

          return
        }

        return true
      }
    }
  }
}

const checkValidate = checkSchema(getBoardDetail, ['params'])
export default validate(checkValidate)
