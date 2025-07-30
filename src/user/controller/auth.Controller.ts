import { Request, Response } from "express";
import * as authTypes from "../types/auth.types";
import * as authServices from "../services/auth.services";



export const getOtpController = async (
    request: Request<{},{},authTypes.GetOtp>,
    response: Response
) => {
    try {
        const otpData = await authServices.sendOtp(request.body)
        response.status(otpData.statusCode).json(otpData.response)
    } catch (err) {
        console.error('error in send otp controller==>',err)
        response.status(500).json({
            status:false,
            message:"Internal Server error"
        })
    }
}


export const verifyOtpController =async (
    request:Request<{},{},authTypes.VerifyOtp>,
    response:Response
) =>{
    try{
        const verifyData = await authServices.verifyOtp(request.body)
        response.status(verifyData.statusCode).json(verifyData.response)
    }catch(err){
        console.error('error in verify otp controller==>', err);
        response.status(500).json({
            status:false,
            message:"Internal Server error"
        })
    }
}