import dotenv from 'dotenv'
dotenv.config()

export const MONGO = {
  USERNAME: process.env.DB_USERNAME as string,
  PASSWORD: process.env.DB_PASSWORD as string
} as const
