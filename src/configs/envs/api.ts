import dotenv from 'dotenv'
dotenv.config()

export const API_DEVELOPMENT = {
  PORT: process.env.PORT as string
} as const

export const API_PRODUCTION = {
  CLIENT_URL: process.env.CLIENT_URL as string
} as const
