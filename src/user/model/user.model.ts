import mongoose, { Schema } from "mongoose";
import { User } from "../types/user.types";




const UserSchema = new Schema<User>({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true,
        unique:true,
        required:true
    },
})


export const UserModel = mongoose.model('user',UserSchema)