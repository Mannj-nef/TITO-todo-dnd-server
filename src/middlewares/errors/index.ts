import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatuss'
import CustomError from '~/models/errors'

const exceptionHandling = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode } = error

  res.status(statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    ...error
  })
}

export default exceptionHandling
