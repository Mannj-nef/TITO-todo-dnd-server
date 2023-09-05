import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  return hash
}

export const comparePassword = ({ pssword, passwordHash }: { pssword: string; passwordHash: string }) => {
  const isPasswordCompare = bcrypt.compareSync(pssword, passwordHash)

  return isPasswordCompare
}
