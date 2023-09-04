import { Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'

const userController = {
  // [POST] /user/login
  login: (req: Request, res: Response) => {
    res.json({
      message: USERS_MESSAGES.LOGIN_SUCCESS
    })
  }
}

export default userController
