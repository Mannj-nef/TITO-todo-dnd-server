import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatuss'
import { CARD_MESSAGE } from '~/constants/messages'
import UserModel from '~/models/schemas/User'
import cardService from '~/services/card/indes'
import { typeCardCreateRequest } from '~/types/request/card'

const cardController = {
  getDetail: async (req: Request, res: Response) => {
    const { cardId } = req.params
    const card = await cardService.getDetail(cardId)

    return res.json({
      message: CARD_MESSAGE.GET_DETAIL_SUCCESS,
      card
    })
  },

  create: async (req: Request, res: Response) => {
    const cardRequest = req.body as typeCardCreateRequest
    const user = req.user as UserModel

    const card = await cardService.create({ cardPayload: cardRequest, user })

    return res.status(HTTP_STATUS.CREATED).json({
      message: CARD_MESSAGE.CREATE_SUCCESS,
      card
    })
  },

  update: async (req: Request, res: Response) => {
    const { _id, ...spress } = req.body
    const card = await cardService.update({ cardId: _id, payload: spress })

    return res.json({
      message: CARD_MESSAGE.UPDATE_SUCCESS,
      card
    })
  },

  remove: async (req: Request, res: Response) => {
    const cardId = req.params?.cardId

    await cardService.remove(cardId)
    return res.json({
      message: CARD_MESSAGE.REMOVE_SUCCESS
    })
  }
}

export default cardController
