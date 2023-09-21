import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatuss'
import { USERS_MESSAGES } from '~/constants/messages'
import database from '~/databases'
import UserModel from '~/models/schemas/User'
import userService from '~/services/user'
import { TokenPayload } from '~/types/request/token'

const userController = {
  // [GET] /user/me
  getMe: async (req: Request, res: Response) => {
    const { user_id } = req.decoded_token as TokenPayload

    const user = await userService.getMe(user_id)

    return res.json({
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      user
    })
  },

  // [POST] /user/login
  login: async (req: Request, res: Response) => {
    const { _id } = req.user as UserModel
    const result = await userService.login(`${_id?.toString()}`)

    return res.status(HTTP_STATUS.ACCEPTED).json({
      message: USERS_MESSAGES.LOGIN_SUCCESS,
      ...result
    })
  },

  // [POST] /user/register
  register: async (req: Request, res: Response) => {
    const result = await userService.register(req.body)

    return res.status(HTTP_STATUS.CREATED).json({
      message: USERS_MESSAGES.REGISTER_SUCCESS,
      ...result
    })
  },

  // [POST] /user/refresh-token
  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.body

    const result = await userService.refreshToken({
      refetchTokenOld: refreshToken,
      decodedToken: req.decoded_token as TokenPayload
    })

    return res.status(200).json({
      message: 'refresh token success',
      ...result
    })
  },

  // [DELETE] /user/logout
  logout: async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    await userService.logout(refreshToken)

    return res.json({
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    })
  },

  // [PATCH] /user/update
  update: async (req: Request, res: Response) => {
    const { user_id } = req.decoded_token as TokenPayload

    const user = userService.update({ userId: user_id, payload: req.body })
    return res.json({
      message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
      user
    })
  }
}

export default userController
