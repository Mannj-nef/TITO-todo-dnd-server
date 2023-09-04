import { Router } from 'express'
import userRouter from './users'

const router = Router()

router.use('/user', userRouter)

// router not found!
router.use('*', () => {
  console.log('not found')
})
export default router
