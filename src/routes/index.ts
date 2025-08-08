import express from 'express'
import userRouter from '../user/user.routes'
import mediaRoutes from '../media/media.routes'


const router = express.Router()


router.use('/user',userRouter)
router.use('/media',mediaRoutes)


export default router