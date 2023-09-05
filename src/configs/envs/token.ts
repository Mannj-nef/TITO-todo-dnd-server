import dotenv from 'dotenv'
dotenv.config()

export const TOKEN_ENV = {
  ACCESS_KEY: process.env.JWT_ACCESS_TOKEN as string,
  REFRESH_KEY: process.env.JWT_REFRESH_TOKEN as string,

  ACCESS_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  REFRESH_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string
} as const
