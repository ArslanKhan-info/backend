import env from 'dotenv'
import * as authTypes from "../types/auth.types";
import { MobileOtpModel } from "../model/auth.model";
import * as userServices from "./user.services";
import jwt from 'jsonwebtoken'

env.config()




const generateJWT = (
    data: any,
    expiresIn: string = (process.env.JWT_EXPIRY || "365d")) => {
    try {
        const token = jwt.sign(data, (process.env.JWT_PRIVATE_KEY as jwt.Secret), { expiresIn: expiresIn } as jwt.SignOptions);
        return token
    } catch (err) {
        console.log('error while creating JwT ==>', err);
        throw err
    }
}

export const sendOtp = async (data: authTypes.GetOtp): Promise<authTypes.ServiceResponse> => {
    try {
        const isOtpExisting = await MobileOtpModel.findOne({ mobile: data.mobile, country_code: data.country_code })
        if (isOtpExisting) {
            return {
                statusCode: 200,
                response: {
                    status: true,
                    message: 'OTP already sent to your mobile number. Try after 2 minutes.'
                }
            }
        } else {
            await MobileOtpModel.create({ ...data })
            return {
                statusCode: 200,
                response: {
                    status: true,
                    message: 'Otp sent to mobile number',
                }
            }
        }
    } catch (err) {
        throw err
    }
}

export const verifyOtp = async (data: authTypes.VerifyOtp): Promise<authTypes.ServiceResponse> => {
    try {
        const currentOtp = await MobileOtpModel.findOne({ mobile: data.mobile, country_code: data.country_code })
        if (currentOtp) {
            if (currentOtp.otp === data.otp) {
                await currentOtp.deleteOne()
                const user = await userServices.findUserByWhere({ mobile: data.mobile })
                if (user && user.status != 1) {
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: user.status == 0 ? "Account is deleted" : 'Account is blocked. Please contact admin',
                            // user_Data: user
                        }
                    }
                } else if (user && user.is_profile_completed) {
                    const token = generateJWT({ id: user?._id })
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: 'Logged in succesfylly',
                            user_data: user,
                            token
                        }
                    }
                } else if (user) {
                    const token = generateJWT({ id: user?._id })
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: 'Mobile number registered successfully. Please complete profile',
                            token,
                            is_profile_completed: false
                        }
                    }
                } else {
                    const token = generateJWT({ id: user?._id })
                    const newUser = await userServices.createUser({
                        mobile: data.mobile,
                        country_code: data.country_code
                    })
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: 'Mobile number registered successfully',
                            token,
                            user_data: newUser
                        }
                    }
                }
            } else {
                return {
                    statusCode: 401,
                    response: {
                        status: false,
                        message: 'Invalid Otp'
                    }
                }
            }
        } else {
            return {
                statusCode: 401,
                response: {
                    status: false,
                    message: 'OTP has expired please send a new Otp'
                }
            }
        }
    } catch (err) {
        throw err
    }
}

