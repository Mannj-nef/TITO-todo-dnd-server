import database from '~/databases'
import userSchema from '../schema'
import { typeUserRegisterValidate } from '../types'
import { USERS_MESSAGES } from '~/constants/messages'
import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import UserModel from '~/models/schemas/User'

const register: typeUserRegisterValidate = {
  email: {
    ...userSchema.email,
    custom: {
      options: async (email: string) => {
        const emailUser = email.toLowerCase().trim()

        const user = await database.users.findOne({ email: emailUser })

        if (user) {
          throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS)
        }

        return true
      }
    }
  },
  password: userSchema.password,
  confirmPassword: userSchema.confirm_password,
  dateOfBird: userSchema.dateOfBird
}

const checkValidate = checkSchema(register, ['body'])
export default validate(checkValidate)
