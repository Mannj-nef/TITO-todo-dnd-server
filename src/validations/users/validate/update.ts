import { checkSchema } from 'express-validator'
import userSchema from '../schema'
import { typeUserUpdateValidate } from '../types'
import validate from '~/utils/validate'
import database from '~/databases'
import CustomError from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatuss'
import { USERS_MESSAGES } from '~/constants/messages'
import { comparePassword } from '~/utils/password'

const updateValidate: typeUserUpdateValidate = {
  email: {
    ...userSchema.email,
    custom: {
      options: async (email, { req }) => {
        const emailUser = email.toLowerCase()
        const { password } = req.body

        const user = await database.users.findOne({ email: emailUser })

        if (!user) {
          throw new Error(USERS_MESSAGES.USER_NOT_FOUND)
        }

        if (user && password) {
          const passwordExactly = comparePassword({
            pssword: req.body.password,
            passwordHash: user?.password
          })

          if (!passwordExactly) {
            throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
          }
        }

        return true
      }
    }
  },
  name: userSchema.name,
  avatar: userSchema.avatar,
  backGround: userSchema.background,
  date_of_birth: userSchema.date_of_birth
}

const checkValidate = checkSchema(updateValidate, ['body'])
export default validate(checkValidate)
