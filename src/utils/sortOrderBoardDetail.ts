import BoardModel, { IBoardDetail } from '~/models/schemas/Board'
import ColumnModel, { IColumndetail } from '~/models/schemas/Column'

export const mapOrder = (originalArray: any, orderArray: any, key: string) => {
  /**
   const originalArray = [
      { id: 1, name: 'q' },
      { id: 3, name: 'b' },
      { id: 2, namr: 'p' }
    ]
    const orderArray = [1, 2, 3]
    const key = 'id

    result: orderedArray = [
      { id: 1, name: 'q' },
      { id: 2, namr: 'p' },
      { id: 3, name: 'b' }
    ]
 */
  if (!originalArray || !orderArray || !key) return []

  const clonedArray = [...originalArray]
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
  })

  return orderedArray
}

export const orderedBoard = ({
  unprocessedTable,
  board,
  unprocessedColums
}: {
  unprocessedTable: BoardModel
  board: IBoardDetail
  unprocessedColums: ColumnModel[]
}) => {
  // cards
  const orderColumns = unprocessedColums.map((column) => {
    const orderedCardId = column.cards.map((card) => card.toString())
    return {
      ...column,
      cards: orderedCardId
    }
  })

  const columnClone = board.columns.map((column) => {
    const orderedCardId = column.cards.map((card) => ({ ...card, _id: card._id?.toString() }))
    return {
      ...column,
      cards: orderedCardId
    }
  })

  const orderedCards = () => {
    const result = []
    for (let i = 0; i < orderColumns.length; i++) {
      const orderedCardsId = orderColumns[i].cards
      const cardColone = columnClone[i].cards

      const orderedCard: IColumndetail[] = mapOrder(cardColone, orderedCardsId, '_id')

      result.push(orderedCard)
    }

    return result
  }

  // columns
  const orderedColumnId = unprocessedTable.columns.map((column) => column.toString())
  const columnsClone = board.columns.map((column, index) => {
    return { ...column, _id: column._id?.toString(), cards: orderedCards()[index] }
  })

  const orderedColumns: IColumndetail[] = mapOrder(columnsClone, orderedColumnId, '_id')

  const result = {
    ...board,
    columns: orderedColumns
  }

  return result
}
