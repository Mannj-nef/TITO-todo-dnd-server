import { checkSchema } from 'express-validator'
import { typeColumnUpdate } from '../types'
import validate from '~/utils/validate'
import columnSchema from '../schema'
import database from '~/databases'
import { ObjectId } from 'mongodb'
import CustomError from '~/models/errors'
import { COLUMN_MESSAGE } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatuss'

const updateCard: typeColumnUpdate = {
  cards: {},
  columnId: {
    custom: {
      options: async (columnId) => {
        const column = await database.columns.findOne({ _id: new ObjectId(columnId) })

        if (!column) {
          throw new CustomError({ message: COLUMN_MESSAGE.NOT_FOULD, statusCode: HTTP_STATUS.NOT_FOUND })
        }

        return true
      }
    }
  }
}

const validateSchema = checkSchema(updateCard, ['body'])
export default validate(validateSchema)
