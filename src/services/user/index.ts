import { ObjectId } from 'mongodb'
import database from '~/databases'
import RefreshTokenModel from '~/models/schemas/RefreshToken'
import UserModel, { IUser } from '~/models/schemas/User'
import { typeRegisterRequestBody, typeUpdateUserRequestBody } from '~/types/request'
import { TokenPayload } from '~/types/request/token'
import { responseTokenGoogle } from '~/types/response/oauth'
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

  loginOauthGoogle: async (userGoogle: responseTokenGoogle) => {
    const user = await database.users.findOne({ email: userGoogle.email })

    if (user) {
      const { token, refreshToken } = await userService.login(user._id.toString())

      return { refreshToken, token }
    } else {
      const { token, refreshToken } = await userService.register({
        email: userGoogle.email,
        password: 'Todo-dnd-husky.123',
        date_of_birth: new Date(),
        avatar: userGoogle.picture,
        name: `${userGoogle.given_name} ${userGoogle.family_name}`
      })

      return { token, refreshToken }
    }
  },

  register: async (payload: IUser) => {
    const userId = new ObjectId()

    const newUser: IUser = {
      ...payload,
      _id: userId,
      email: payload.email.toLowerCase().trim(),
      date_of_birth: new Date(payload.date_of_birth),
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
  },

  logout: async (refToken: string) => {
    await database.refreshTokens.deleteOne({ token: refToken })
  },

  update: async ({ payload, userId }: { payload: typeUpdateUserRequestBody; userId: string }) => {
    const { password } = payload

    if (password) {
      const newUser = {
        ...payload,
        password: hashPassword(password)
      }

      const user = await database.users.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $set: newUser },
        {
          returnDocument: 'after',
          projection: {
            password: 0,
            forgot_password_token: 0
          }
        }
      )
      return user
    }

    const user = await database.users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { ...payload } },
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          forgot_password_token: 0
        }
      }
    )

    return user
  }
}

export default userService
