import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../user/types/user.types";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from 'dotenv'

env.config(

)
interface CustomeRequest extends Request {
    user: string | JwtPayload ,
    token: string | JwtPayload
}


export const verifyRequestToken:RequestHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new Error()
        }
        const token = authHeader?.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as jwt.Secret);
        (request as CustomeRequest).user = decoded
        next()
    } catch (err) {
        response
            .status(401)
            .json({
                status: false,
                message: 'Unauthorized Access / Token expired'
            })
    }
}