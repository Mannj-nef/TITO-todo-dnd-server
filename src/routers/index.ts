import { Router } from 'express'
import userRouter from './users'
import boardRouter from './boards'
import columnRouter from './columns/indes'
import cardRouter from './cards'

const router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/columns', columnRouter)
router.use('/cards', cardRouter)

// router not found!
router.use('*', () => {
  console.log('not found')
})
export default router
