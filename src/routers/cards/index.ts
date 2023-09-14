import { Router } from 'express'
import cardController from '~/controllers/card'
import middlewaseAuth from '~/middlewares/auth'
import wrappRequest from '~/utils/wrappRequest'
import cardValidate from '~/validations/cards'

const cardRouter = Router()
/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string, card: CardModel }
 */
cardRouter.get('/:cardId', middlewaseAuth.authentication, wrappRequest(cardController.getDetail))

/**
 * [POST]
 * Path: /create
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { 
    boardId: string;
    columnId: string;
    description: string;
    title: string;
    type: typeCard;
   }
 * Response : { message: string, card: CardModel }
 */
cardRouter.post('/create', middlewaseAuth.authentication, cardValidate.create, wrappRequest(cardController.create))

/**
 * [PATCH]
 * Path: /update
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { card: CardModel }
 * Response : { message: string, card: CardModel }
 */
cardRouter.patch('/update', middlewaseAuth.authentication, wrappRequest(cardController.update))

/**
 * [DELETE]
 * Path: /remove/:cardId
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string }
 */
cardRouter.delete(
  '/remove/:cardId',
  middlewaseAuth.authentication,
  cardValidate.removeCard,
  wrappRequest(cardController.remove)
)

export default cardRouter
