import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/enums/token'

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  exp: number
  iat: number
}
