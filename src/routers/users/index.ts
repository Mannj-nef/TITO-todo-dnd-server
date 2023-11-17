import { Router } from 'express'
import userController from '~/controllers/users'
import middlewaseAuth from '~/middlewares/auth'
import wrappRequest from '~/utils/wrappRequest'
import validator from '~/validations/users'

const userRouter = Router()

/**
 * [GET]
 * Path: /me
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response: Omit<UserModel[], {
 *              password: string,
 *              forgot_password_token: JWT<forgot_password_token>,
 *              verify-email-token: JWT<email_verify_token>
 *           }>
 */
userRouter.get('/me', middlewaseAuth.authentication, wrappRequest(userController.getMe))

/**
 * [GET]
 * Path: /oauth/google
 * Querry: {code: string}
 * Redirect: /?accesstoken=JWT<access_token>&refreshToken=JWT<refresh_token>
 */
userRouter.get('/oauth/google', wrappRequest(userController.oauth))

/**
 * [POST]
 * Path: /login
 * Body: { email: string, password: string }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/login', validator.login, wrappRequest(userController.login))

/**
 * [POST]
 * Path: /register
 * Body: { email: string, password: string, confirmPassword: string, dateOfBird: Date }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/register', validator.register, wrappRequest(userController.register))

/**
 * [POST]
 * Path: /refresh-token
 * Body: { refetchToken: JWT<refresh_token> }
 * Response: { accessToken: JWT<access_token>, refetchToken: JWT<refresh_token>, message: string }
 */
userRouter.post('/refresh-token', middlewaseAuth.refreshToken, wrappRequest(userController.refreshToken))

/**
 * [DELETE]
 * Path: /logout
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { refetchToken: JWT<refresh_token> }
 * Response: { message: string }
 */
userRouter.post(
  '/logout',
  middlewaseAuth.authentication,
  middlewaseAuth.refreshToken,
  wrappRequest(userController.logout)
)

/**
 * [PATCH]
 * Path: /update
 * Header: {Authorization: 'Bearer <access_token>'}
 * Body: { 
    email: string;
    name: string;
    dataOfBirth?: Date;
    password?: string;
    avatar?: string;
    backGround?: string;
 }
 * Response: { 
    message: string, 
    user: Omit<UserModel[], {
 *              password: string,
 *              forgot_password_token: JWT<forgot_password_token>,
 *              verify-email-token: JWT<email_verify_token>
 *           }> }
 */
userRouter.patch('/update', middlewaseAuth.authentication, validator.update, wrappRequest(userController.update))

export default userRouter
