import { Router } from 'express'
import userRouter from './users'
import boardRouter from './boards'

const router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)

// router not found!
router.use('*', () => {
  console.log('not found')
})
export default router
