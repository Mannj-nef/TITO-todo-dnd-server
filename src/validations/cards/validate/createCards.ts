import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { typeCreateCard } from '../types'
import cardSchema from '../schema'
import database from '~/databases'
import { ObjectId } from 'mongodb'
import CustomError from '~/models/errors'
import { CARD_MESSAGE } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatuss'
import UserModel from '~/models/schemas/User'
import { TokenPayload } from '~/types/request/token'

const create: typeCreateCard = {
  boardId: {
    ...cardSchema.boardId,
    custom: {
      options: async (boardId: string) => {
        const board = await database.boards.findOne({ _id: new ObjectId(boardId) })
        boardId

        if (!board) {
          throw new CustomError({ statusCode: HTTP_STATUS.BAD_REQUEST, message: CARD_MESSAGE.NOT_BOARD })
        }

        return true
      }
    }
  },
  columnId: {
    ...cardSchema.columnId,
    custom: {
      options: async (columnId: string, { req }) => {
        const { user_id } = req.decoded_token as TokenPayload

        const user = await database.users.findOne(
          { _id: new ObjectId(user_id) },
          {
            projection: {
              password: 0,
              created_at: 0,
              update_at: 0,
              forgot_password_token: 0
            }
          }
        )

        const column = await database.columns.findOne({ _id: new ObjectId(columnId) })

        if (!column) {
          throw new CustomError({ statusCode: HTTP_STATUS.BAD_REQUEST, message: CARD_MESSAGE.NOT_COLUMN })
        }

        req.user = user
        return true
      }
    }
  },
  description: cardSchema.description,
  title: cardSchema.title,
  type: cardSchema.type
}

const checkValidate = checkSchema(create, ['body'])
export default validate(checkValidate)
