import express from 'express'
import { getOtpController, register, verifyOtpController } from './controller/auth.Controller'
import validate from '../middelware/validate'
import * as validationSchema from './user.validation'
import { verifyRequestToken } from '../middelware/auth'

const userRouter = express.Router()


userRouter.post('/get_mobile_otp',validate(validationSchema.otpValidationSchema),getOtpController)
userRouter.post('/verify_mobile_otp',validate(validationSchema.otpVerifyValidationSchema),verifyOtpController)
userRouter.post('/register',verifyRequestToken,register)



export default userRouter