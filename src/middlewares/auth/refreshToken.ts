import { NextFunction, Request, Response } from 'express'
import { TOKEN_ENV } from '~/configs/envs'
import HTTP_STATUS from '~/constants/httpStatuss'
import { USERS_MESSAGES } from '~/constants/messages'
import database from '~/databases'
import { verifyToken } from '~/utils/token'

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
    })
  }

  try {
    const isRefreshTokenExistsed = await database.refreshToken.findOne({ token: refreshToken })

    if (!isRefreshTokenExistsed) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXIST
      })
    }

    const decoded = verifyToken({ token: refreshToken, secretKey: TOKEN_ENV.REFRESH_KEY })

    req.decoded_token = decoded

    next()
  } catch (error) {
    next(error)
  }
}
export default refreshToken
