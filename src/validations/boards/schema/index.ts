import { typeBoardSchema } from '../types'

const boardSchema: typeBoardSchema = {
  _id: { isString: true },
  name: {
    notEmpty: { errorMessage: 'k dc de trong' },
    isString: { errorMessage: 'phai la string' },
    trim: true
  },
  cover_photo: {
    isString: { errorMessage: 'phai la string' },
    trim: true
  },
  admins: {},
  columns: {},
  created_at: {},
  members: {},
  update_at: {}
}

export default boardSchema
