import { checkSchema } from 'express-validator'
import { typeUpdateCardBetweenDiffColumns } from '../types'
import validate from '~/utils/validate'
import database from '~/databases'
import { ObjectId } from 'mongodb'
import CustomError from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatuss'
import { CARD_MESSAGE } from '~/constants/messages'
import columnSchema from '../schema'

const updateCard: typeUpdateCardBetweenDiffColumns = {
  newColumnId: { ...columnSchema._id },
  oldColumnId: { ...columnSchema._id },

  cards: {
    isArray: true,
    custom: {
      options: (cards: string[]) => {
        if (cards.length <= 0 || cards.every((c) => typeof c !== 'string')) {
          throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: CARD_MESSAGE.CARD_NOT_FOULD })
        }

        return true
      }
    }
  },

  cardActiveId: {
    custom: {
      options: async (cardId) => {
        const card = await database.cards.findOne({ _id: new ObjectId(cardId) })

        if (!card) {
          throw new CustomError({ statusCode: HTTP_STATUS.NOT_FOUND, message: CARD_MESSAGE.CARD_NOT_FOULD })
        }
      }
    }
  }
}

const validateSchema = checkSchema(updateCard, ['body'])
export default validate(validateSchema)
