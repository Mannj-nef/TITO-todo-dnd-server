export type typeColumnUpdateCards = {
  columnId: string
  cards: string[]
}

export type typeUpdateCardsBetweenColumnDifferent = {
  oldColumnId: string
  newColumnId: string
  cards: string[]
  cardActiveId: string
}

export type typeColumnCreate = {
  boardId: string
  columnName: string
}
