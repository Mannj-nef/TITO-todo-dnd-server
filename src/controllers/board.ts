import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatuss'
import { BOARD_MESSAGE } from '~/constants/messages'
import BoardModel from '~/models/schemas/Board'
import boardService from '~/services/board'
import { typeBoardCreateRequest, typeBoardUpdateOrderedColumn, typeBoardUpdateRequest } from '~/types/request'
import { TokenPayload } from '~/types/request/token'

const boardController = {
  // [GET] /boards
  get: async (req: Request, res: Response) => {
    const { user_id } = req.decoded_token as TokenPayload

    const boards = await boardService.get(user_id)

    return res.json({
      message: BOARD_MESSAGE.GET_SUCCESS,
      boards
    })
  },

  // [GET] /boards/:boardId
  getDetail: async (req: Request, res: Response) => {
    const { boarsId } = req.params
    const { user_id } = req.decoded_token as TokenPayload

    const newBoard = req.newBoard as BoardModel

    if (newBoard) {
      return res.json({
        message: BOARD_MESSAGE.GET_DETAIL_SUCCESS,
        board: newBoard
      })
    }

    const board = await boardService.getDetail({ board_id: boarsId, user_id })

    return res.json({
      message: BOARD_MESSAGE.GET_DETAIL_SUCCESS,
      board
    })
  },

  // [POST] /boards/create
  create: async (req: Request, res: Response) => {
    const { name, backGroundProjectUrl } = req.body as typeBoardCreateRequest
    const { user_id } = req.decoded_token as TokenPayload

    const board = await boardService.create({ userId: user_id, name, cover_photo: backGroundProjectUrl })

    return res.status(HTTP_STATUS.CREATED).json({
      message: BOARD_MESSAGE.CREATE_SUCCESS,
      board
    })
  },

  // [PATCh] /boards/update-column
  updateColumn: async (req: Request, res: Response) => {
    const { boardId, columns } = req.body as typeBoardUpdateOrderedColumn

    await boardService.updateOrderedColumns({ boardId, columns })

    return res.json({
      message: BOARD_MESSAGE.UPDATE_COLUMN_SUCCESS
    })
  },

  // [PATCh] /boards/update
  update: async (req: Request, res: Response) => {
    const { boardId, cover_photo, name } = req.body as typeBoardUpdateRequest
    await boardService.updateBoard({ boardId, cover_photo, name })

    return res.json({
      message: BOARD_MESSAGE.UPDATE_SUCCESS
    })
  },

  // [DELETE] /boards/remove/:id
  remove: async (req: Request, res: Response) => {
    const { boarsId } = req.params
    const { user_id } = req.decoded_token as TokenPayload

    await boardService.remove({ user_id, board_id: boarsId })

    return res.json({
      message: BOARD_MESSAGE.REMOVE_SUCCESS
    })
  }
}

export default boardController
