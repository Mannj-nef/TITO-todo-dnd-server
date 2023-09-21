import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { typeBoardValidate } from '../types'
import boardSchema from '../schema'

const create: typeBoardValidate = {
  name: boardSchema.name,
  backGroundProjectUrl: {
    isString: {
      errorMessage: 'BackGround img must be string '
    }
  }
}

const checkValidate = checkSchema(create, ['body'])
export default validate(checkValidate)
