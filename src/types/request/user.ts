export type typeLoginRequestBody = {
  email: string
  password: string
}

export type typeRegisterRequestBody = {
  email: string
  password: string
  confirmPassword?: string
  dateOfBird: string
}

export type typeUpdateUserRequestBody = {
  email: string
  name: string
  date_of_birth?: Date
  password?: string
  avatar?: string
  background?: string
}
