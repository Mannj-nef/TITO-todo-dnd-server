import { Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import userService from '~/services/user'

const userController = {
  // [POST] /user/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body
    const result = await userService.login({ email, password })

    if (!result) {
      return res.json({
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }

    return res.json({
      message: USERS_MESSAGES.LOGIN_SUCCESS,
      result
    })
  }
}

export default userController
