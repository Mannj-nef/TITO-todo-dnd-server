import { typeRemoceCard } from '../types'
import cardSchema from '../schema'
import validate from '~/utils/validate'
import { checkSchema } from 'express-validator'
import database from '~/databases'
import { ObjectId } from 'mongodb'
import CustomError from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatuss'
import { CARD_MESSAGE } from '~/constants/messages'

const removeCard: typeRemoceCard = {
  cardId: {
    ...cardSchema._id,
    custom: {
      options: async (_, { req }) => {
        const cardId = req.params?.cardId

        const card = await database.cards.findOne({ _id: new ObjectId(cardId) })

        if (!card) {
          throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: CARD_MESSAGE.CARD_NOT_FOULD })
        }

        return true
      }
    }
  }
}

const checkValidate = checkSchema(removeCard, ['params'])
export default validate(checkValidate)
