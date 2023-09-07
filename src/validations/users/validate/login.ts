import database from '~/databases'
import userSchema from '../schema'
import { typeUserLoginValidate } from '../types'
import { checkSchema } from 'express-validator'
import { comparePassword } from '~/utils/password'
import { USERS_MESSAGES } from '~/constants/messages'
import validate from '~/utils/validate'

const login: typeUserLoginValidate = {
  email: {
    ...userSchema.email,
    custom: {
      options: async (email: string, { req }) => {
        const emailUser = email.toLowerCase()
        const user = await database.users.findOne({ email: emailUser })
        const passwordExactly = comparePassword({
          pssword: req.body.password,
          passwordHash: user?.password
        })

        if (!user || !passwordExactly) {
          throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
        }
        req.user = user
        return true
      }
    }
  },
  password: userSchema.password
}

const checkValidate = checkSchema(login, ['body'])
export default validate(checkValidate)
