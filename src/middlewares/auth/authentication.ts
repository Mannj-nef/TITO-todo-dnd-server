import { NextFunction, Request, Response } from 'express'
import { TOKEN_ENV } from '~/configs/envs'
import HTTP_STATUS from '~/constants/httpStatuss'
import { USERS_MESSAGES } from '~/constants/messages'
import CustomError from '~/models/errors'
import { verifyToken } from '~/utils/token'

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
      return next(
        new CustomError({
          statusCode: HTTP_STATUS.UNAUTHORIZED,
          message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
        })
      )
    }

    const [berder, token] = bearerToken.split(' ')

    const decoded_token = verifyToken({ token, secretKey: TOKEN_ENV.ACCESS_KEY })

    req.decoded_token = decoded_token
    next()
  } catch (error) {
    next(error)
  }
}

export default authentication
