import { ParamSchema } from 'express-validator'
import CardModel from '~/models/schemas/Card'
import { typeCardCreateRequest } from '~/types/request/card'

export type typeCardSchema = {
  [k in keyof CardModel]: ParamSchema
}

export type typeCreateCard = {
  [k in keyof typeCardCreateRequest]: ParamSchema
}

export type typeRemoceCard = {
  cardId: ParamSchema
}
