import { ObjectId } from 'mongodb'
import database from '~/databases'
import RefreshTokenModel from '~/models/schemas/RefreshToken'
import UserModel, { IUser } from '~/models/schemas/User'
import { typeRegisterRequestBody } from '~/types/request'
import { TokenPayload } from '~/types/request/token'
import { hashPassword } from '~/utils/password'
import { createToken, verifyToken } from '~/utils/token'

const userService = {
  getMe: async (user_id: string) => {
    const user = await database.users.findOne(
      { _id: new ObjectId(user_id) },
      {
        projection: {
          password: 0,
          forgot_password_token: 0
        }
      }
    )
    return user
  },

  login: async (user_id: string) => {
    const { token, refreshToken } = createToken({ user_id })

    const { exp, iat } = verifyToken({
      token: refreshToken,
      secretKey: process.env.JWT_REFRESH_TOKEN as string
    })

    await database.refreshTokens.insertOne(
      new RefreshTokenModel({ user_id: new ObjectId(user_id), refreshToken, exp, iat })
    )

    return { token, refreshToken }
  },

  register: async (payload: typeRegisterRequestBody) => {
    const userId = new ObjectId()

    const newUser: IUser = {
      ...payload,
      _id: userId,
      email: payload.email.toLowerCase().trim(),
      dateOfBird: new Date(payload.dateOfBird),
      password: hashPassword(payload.password)
    }

    const { token, refreshToken } = createToken({ user_id: userId.toString() })
    const { exp, iat } = verifyToken({
      token: refreshToken,
      secretKey: process.env.JWT_REFRESH_TOKEN as string
    })

    await database.users.insertOne(new UserModel(newUser))
    await database.refreshTokens.insertOne(new RefreshTokenModel({ user_id: userId, refreshToken, exp, iat }))

    return { token, refreshToken }
  },

  refreshToken: async ({ refetchTokenOld, decodedToken }: { refetchTokenOld: string; decodedToken: TokenPayload }) => {
    const { refreshToken, token } = createToken({ user_id: decodedToken.user_id })

    Promise.all([
      database.refreshTokens.deleteOne({
        token: refetchTokenOld,
        user_id: new ObjectId(decodedToken.user_id)
      }),

      database.refreshTokens.insertOne(
        new RefreshTokenModel({
          refreshToken,
          exp: decodedToken.exp,
          iat: decodedToken.iat,
          user_id: new ObjectId(decodedToken.user_id)
        })
      )
    ])

    return { refreshToken, token }
  }
}

export default userService
