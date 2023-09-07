import { USERS_MESSAGES } from '~/constants/messages'
import { typeUserSchema } from '../types'

const userSchema: typeUserSchema = {
  // verify password
  password: {
    notEmpty: { errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED },
    trim: true,
    isLength: {
      options: {
        min: 8,
        max: 50
      },
      errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
    }
  },
  // verify confirm password
  confirm_password: {
    notEmpty: {
      errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
        }
        return true
      }
    }
  },

  email: {
    isEmail: { errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID },
    notEmpty: { errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED },
    trim: true
  },

  // verify confirm password
  dateOfBird: {},

  forgot_password_token: { isString: true },
  name: { isString: true },
  update_at: { isDate: true },
  created_at: { isDate: true },
  avatar: { isString: true },
  _id: { isObject: true }
}

export default userSchema
