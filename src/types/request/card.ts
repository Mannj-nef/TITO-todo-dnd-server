import { typeCard } from '~/models/schemas/Card'
import UserModel from '~/models/schemas/User'

export type typeCardCreateRequest = {
  boardId: string
  columnId: string
  description: string
  title: string
  type: typeCard
}

export type typeCardUpdateRequest = {
  description: string
  imgUrl: string
  title: string
  members: UserModel[]
  type: typeCard
}
