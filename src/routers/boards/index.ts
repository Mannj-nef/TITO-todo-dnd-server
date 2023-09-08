import { Router } from 'express'
import boardController from '~/controllers/board'
import wrappRequest from '~/utils/wrappRequest'

const boardRouter = Router()

/**
 * [GET]
 * Path: /
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string, BoardModel[] }
 */
boardRouter.get('/', wrappRequest(boardController.getBoard))

export default boardRouter
