import { ObjectId } from 'mongodb'
import { typeColumnSchema } from '../types'
import database from '~/databases'
import CustomError from '~/models/errors'
import { COLUMN_MESSAGE } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatuss'

const columnSchema: typeColumnSchema = {
  _id: {
    custom: {
      options: async (_, { req }) => {
        const newColumnId = new ObjectId(req.body.newColumnId)
        const oldColumnId = new ObjectId(req.body.oldColumnId)

        const [newColumn, oldcolumn] = await Promise.all([
          await database.columns.findOne({ _id: newColumnId }),
          await database.columns.findOne({ _id: oldColumnId })
        ])

        if (!newColumn || !oldcolumn) {
          throw new CustomError({ message: COLUMN_MESSAGE.NOT_FOULD, statusCode: HTTP_STATUS.NOT_FOUND })
        }

        return true
      }
    }
  },
  boardId: {},
  cards: {},
  created_at: {},
  name: {},
  update_at: {}
}

export default columnSchema
