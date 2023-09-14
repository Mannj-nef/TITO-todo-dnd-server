import dotenv from 'dotenv'
dotenv.config()

export const MONGO = {
  DB_NAME: process.env.DB_NAME as string,
  USERNAME: process.env.DB_USERNAME as string,
  PASSWORD: process.env.DB_PASSWORD as string,

  // collection
  USER_COLLECTION: process.env.DB_USER_COLLECTION as string,
  REFRESH_TOKEN_COLLECTION: process.env.DB_REFRESHTOKEN_COLLECTION as string,
  BOARD_COLLECTION: process.env.DB_BOARD_COLECTION as string,
  COLUMN_COLLECTION: process.env.DB_COLUMN_COLLECTION as string,
  CARD_COLLECTION: process.env.DB_CARD_COLLECTION as string
} as const
