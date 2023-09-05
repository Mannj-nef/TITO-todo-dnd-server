import { createToken } from '~/utils/token'

const userService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    // query user by email

    const user = {}

    if (!user) return

    // const { token, refreshToken } = createToken({ user_id: user.user_id })

    // return { token, refreshToken }
    return ''
  }
}

export default userService
