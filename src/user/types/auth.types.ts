import { InferType } from 'yup';
import * as validationSchema from '../user.validation';
import { Document, Types } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ServiceResponse {
  statusCode: number;
  response: {
    status: boolean;
    message: string;
    [key: string]: any;
  };
}

export type GetOtp = InferType<typeof validationSchema.otpValidationSchema>;


export interface MobileOtp extends Document {
  mobile: string;
  otp: string;
  created_at: Date;
  country_code: string
}

export interface CustomeAuthRequest extends Request {
  user?:JwtPayload,
}
export type VerifyOtp = InferType<typeof validationSchema.otpVerifyValidationSchema>