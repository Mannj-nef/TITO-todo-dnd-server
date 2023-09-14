import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatuss'
import { COLUMN_MESSAGE } from '~/constants/messages'
import columnService from '~/services/column'
import { typeUpdateCardsBetweenColumnDifferent } from '~/types/request/columns'

const columnController = {
  create: async (req: Request, res: Response) => {
    const { boardId, columnName } = req.body

    const column = await columnService.create({ boardId, columnName })

    return res.status(HTTP_STATUS.CREATED).json({
      message: COLUMN_MESSAGE.CREATE_SUCCESS,
      column
    })
  },

  update: async (req: Request, res: Response) => {
    const { columnId, cards } = req.body

    await columnService.updateCard({ cards, columnId })

    return res.json({
      message: COLUMN_MESSAGE.UPDATE_SUCCESS
    })
  },

  updateCardBetweenDiffColumns: async (req: Request, res: Response) => {
    const payload = req.body as typeUpdateCardsBetweenColumnDifferent

    await columnService.updateCardBetweenDiffColumn(payload)

    return res.json({
      message: COLUMN_MESSAGE.UPDATE_SUCCESS
    })
  },

  remove: async (req: Request, res: Response) => {
    const { columnId } = req.params

    await columnService.remove(columnId)

    return res.json({
      message: COLUMN_MESSAGE.REMOVE_SUCCESS
    })
  }
}

export default columnController
