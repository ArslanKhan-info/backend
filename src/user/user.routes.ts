import express from 'express'
import { getOtpController, verifyOtpController } from './controller/auth.Controller'
import validate from '../middelware/validate'
import * as validationSchema from './user.validation'

const userRouter = express.Router()


userRouter.post('/get_mobile_otp',validate(validationSchema.otpValidationSchema),getOtpController)
userRouter.post('/verify_mobile_otp',validate(validationSchema.otpVerifyValidationSchema),verifyOtpController)


export default userRouter