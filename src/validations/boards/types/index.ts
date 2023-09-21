import { ParamSchema } from 'express-validator'
import BoardModel from '~/models/schemas/Board'
import { typeBoardCreateRequest, typeBoardUpdateRequest } from '~/types/request'

export type typeBoardSchema = {
  [k in keyof Required<BoardModel>]: ParamSchema
}

export type typeBoardValidate = {
  [k in keyof typeBoardCreateRequest]: ParamSchema
}

export type typeGetBoardDetail = {
  boarsId: ParamSchema
}

export type typeUpdateBoard = {
  [k in keyof typeBoardUpdateRequest]: ParamSchema
}
