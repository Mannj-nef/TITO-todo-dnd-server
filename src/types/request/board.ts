export type typeBoardCreateRequest = {
  name: string
  backGroundProjectUrl: string
}

export type typeBoardUpdateOrderedColumn = {
  boardId: string
  columns: string[]
}

export type typeBoardUpdateRequest = {
  boardId: string
  name: string
  cover_photo: string
}
