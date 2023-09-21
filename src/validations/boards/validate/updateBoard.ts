import { typeUpdateBoard } from '../types'
import boardSchema from '../schema'
import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { ObjectId } from 'mongodb'
import database from '~/databases'
import CustomError from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatuss'
import { BOARD_MESSAGE } from '~/constants/messages'

const update: typeUpdateBoard = {
  boardId: {
    custom: {
      options: async (id) => {
        const boardId = new ObjectId(id)

        const board = await database.boards.findOne({ _id: boardId })

        if (!board) {
          throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: BOARD_MESSAGE.NOT_FOUND })
        }

        return true
      }
    }
  },
  name: boardSchema._id,
  cover_photo: boardSchema.cover_photo
}

const validateUpdate = checkSchema(update, ['body'])
export default validate(validateUpdate)
