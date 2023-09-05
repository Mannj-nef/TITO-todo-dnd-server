import jwt from 'jsonwebtoken'
import { TOKEN_ENV } from '~/configs/envs'

enum TokenType {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken'
}

interface ITokenPayload {
  user_id: string
  token_type?: TokenType
}

export const signToken = ({
  payload,
  type,
  secretKey,
  expiresIn
}: {
  payload: ITokenPayload
  type: TokenType
  secretKey: string
  expiresIn: string
}) => {
  const data = {
    ...payload,
    token_type: type
  }
  const token = jwt.sign(data, secretKey, { expiresIn: expiresIn })

  return token
}

export const createToken = (data: ITokenPayload) => {
  const token = signToken({
    payload: data,
    type: TokenType.AccessToken,
    secretKey: TOKEN_ENV.ACCESS_KEY,
    expiresIn: TOKEN_ENV.ACCESS_EXPIRES
  })

  const refreshToken = signToken({
    payload: data,
    type: TokenType.RefreshToken,
    secretKey: TOKEN_ENV.REFRESH_KEY,
    expiresIn: TOKEN_ENV.REFRESH_EXPIRES
  })

  return { token, refreshToken }
}
