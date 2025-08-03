import mongoose, { Schema } from "mongoose";
import * as authTypes from "../types/auth.types";



const MobileOtpSchema = new Schema<authTypes.MobileOtp>({
    mobile: {
        type: String,
        trim: true,
        unique: true
    },
    otp: {
        type: String,
        default:'1234'
    },
    created_at: {
        type: Date,
        default: new Date,
        expires: 300
    },
    country_code: {
        type: String,
        trim: true,
    }
})

export const MobileOtpModel = mongoose.model('mobileOtp', MobileOtpSchema)