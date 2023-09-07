import { typeLoginRequestBody, typeRegisterRequestBody } from '~/types/request'
import { ParamSchema } from 'express-validator'
import { IUser } from '~/models/schemas/User'

export type typeUserSchema = {
  [k in keyof Required<IUser>]: ParamSchema
} & {
  confirm_password: ParamSchema
}

export type typeUserLoginValidate = {
  [k in keyof typeLoginRequestBody]: ParamSchema
}

export type typeUserRegisterValidate = {
  [k in keyof typeRegisterRequestBody]: ParamSchema
}
