import { Router } from 'express'
import columnController from '~/controllers/column'
import middlewaseAuth from '~/middlewares/auth'
import wrappRequest from '~/utils/wrappRequest'
import validateColumn from '~/validations/columns'

const columnRouter = Router()

/**
 * [POST]
 * Path: /create
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { boardId: string, columnName: string }
 * Response : { message: string, column: ColumnMoles }
 */
columnRouter.post('/create', middlewaseAuth.authentication, wrappRequest(columnController.create))

/**
 * [PATCH]
 * Path: /update-card
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { cards: cardId[], columnId }
 * Response : { message: string, column: ColumnMoles }
 */
columnRouter.patch(
  '/update-card',
  middlewaseAuth.authentication,
  validateColumn.updateCardInColumn,
  wrappRequest(columnController.update)
)

/**
 * [PATCH]
 * Path: /update-cards-diff-column
 * Header: { Authorization: 'Bearer <access_token>' }
 * Body: { oldColumnId: string, newColumnid: string, cardActiveId: string, cards: string[] }
 * Response : { message: string, column: ColumnMoles }
 */
columnRouter.patch(
  '/update-cards-diff-column',
  middlewaseAuth.authentication,
  validateColumn.updateCardBetweenColumns,
  wrappRequest(columnController.updateCardBetweenDiffColumns)
)

/**
 * [DELETE]
 * Path: /remove/:columnId
 * Header: { Authorization: 'Bearer <access_token>' }
 * Response : { message: string }
 */
columnRouter.delete('/remove/:columnId', middlewaseAuth.authentication, wrappRequest(columnController.remove))

export default columnRouter
