import mongoose, { Mongoose } from "mongoose";
import * as authTypes from "../types/auth.types";
import { MobileOtpModel } from "../model/auth.model";
import { findUserByWhere } from "./user.services";


export const sendOtp = async (data: authTypes.GetOtp): Promise<authTypes.ServiceResponse> => {
    try {
        const isOtpExisting = await MobileOtpModel.findOne({ mobile: data.mobile, countryCode: data.countryCode })
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
        const currentOtp = await MobileOtpModel.findOne({ mobile: data.mobile, countryCode: data.countryCode })
        if (currentOtp) {
            if (currentOtp.otp === data.otp) {
                // currentOtp.deleteOne()
                const user = await findUserByWhere({ mobile: data.mobile })
                if (user) {
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: 'Logged in sucessfully',
                            user_Data:user
                        }
                    }
                } else {
                    return {
                        statusCode: 200,
                        response: {
                            status: true,
                            message: 'Otp verified sucessfully. Please complete profile'
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

