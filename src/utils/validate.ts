import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'

import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatuss'

const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  const handle = async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    const errorsObject = {
      statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      errorObject: errors.mapped()
    }

    next(errorsObject)
  }

  return handle
}

export default validate
