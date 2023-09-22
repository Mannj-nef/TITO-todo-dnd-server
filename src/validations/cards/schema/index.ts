import { typeCardSchema } from '../types'

const cardSchema: typeCardSchema = {
  boardId: { isString: true },
  columnId: {},
  description: {},
  imgUrl: {},
  members: {},
  title: {},
  type: {},
  _id: {},
  created_at: {},
  update_at: {}
}

export default cardSchema
