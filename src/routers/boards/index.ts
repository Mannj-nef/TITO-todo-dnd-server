import { Router } from 'express'
import boardController from '~/controllers/board'
import middlewaseAuth from '~/middlewares/auth'
import wrappRequest from '~/utils/wrappRequest'
import boardValidator from '~/validations/boards'

const boardRouter = Router()

/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string, boards: BoardModel[] }
 */
boardRouter.get('/', middlewaseAuth.authentication, wrappRequest(boardController.get))

/**
 * [POST]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string, ...BoardModel }
 */
boardRouter.get(
  '/:boarsId',
  middlewaseAuth.authentication,
  boardValidator.getBoardDetail,
  wrappRequest(boardController.getDetail)
)

/**
 * [POST]
 * Path: /create
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: {name: string, backGroundProjectUrl: string }
 * Response : { message: string, ...BoardModel }
 */
boardRouter.post(
  '/create',
  middlewaseAuth.authentication,
  boardValidator.boardCreate,
  wrappRequest(boardController.create)
)

/**
 * [PATCH]
 * Path: /update
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { boardId: string, name: string, cover_photo: string }
 * Response : { message: string }
 */
boardRouter.patch(
  '/update',
  middlewaseAuth.authentication,
  boardValidator.updateBoard,
  wrappRequest(boardController.update)
)

/**
 * [PATCH]
 * Path: /update-column
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { columns: string[] }
 * Response : { message: string }
 */
boardRouter.patch('/update-column', middlewaseAuth.authentication, wrappRequest(boardController.updateColumn))

/**
 * [DELETE]
 * Path: /remove/:id
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { columns: string[] }
 * Response : { message: string }
 */
boardRouter.delete('/remove/:boarsId', middlewaseAuth.authentication, wrappRequest(boardController.remove))

export default boardRouter
