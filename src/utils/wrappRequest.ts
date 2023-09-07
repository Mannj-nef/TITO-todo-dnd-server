import { NextFunction, Request, RequestHandler, Response } from 'express'

const wrappRequest = (fnController: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve()
      .then(() => fnController(req, res, next))
      .catch(next)
  }
}

export default wrappRequest
