export const SHOW_USER = {
  password: 0,
  forgot_password_token: 0,
  created_at: 0,
  update_at: 0
} as const

export const LOOKUP_MEMBERS = {
  from: 'users',
  localField: 'members',
  foreignField: '_id',
  as: 'members'
} as const

export const LOOKUP_ADMINS = {
  from: 'users',
  localField: 'admins',
  foreignField: '_id',
  as: 'admins'
} as const

export const LOOKUP_COLUMNS = {
  from: 'columns',
  localField: 'columns',
  foreignField: '_id',
  as: 'columns'
} as const

export const LOOKUP_CARDS = {
  from: 'cards',
  localField: 'columns.cards',
  foreignField: '_id',
  as: 'columns.cards'
} as const
