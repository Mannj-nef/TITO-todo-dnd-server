import { ParamSchema } from 'express-validator'
import ColumnModel from '~/models/schemas/Column'
import { typeColumnUpdateCards, typeUpdateCardsBetweenColumnDifferent } from '~/types/request/columns'

export type typeColumnSchema = {
  [k in keyof ColumnModel]: ParamSchema
}

export type typeColumnUpdate = {
  [k in keyof typeColumnUpdateCards]: ParamSchema
}

export type typeUpdateCardBetweenDiffColumns = {
  [k in keyof typeUpdateCardsBetweenColumnDifferent]: ParamSchema
}
