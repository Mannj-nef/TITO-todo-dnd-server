import { Router } from 'express'
import userController from '~/controllers/users'

const userRouter = Router()

/**
 * [POST]
 * Path: /login
 * Body: { email: string, password: string }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/login', userController.login)

export default userRouter
