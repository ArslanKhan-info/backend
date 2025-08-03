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
    is_profile_completed:{
        type:Boolean,
        default:false
    },
    status:{
        type:Number,
        enum:[0,1,2],
        default:1
    },
    country_code:{
        type: String,
        trim: true,
        required:true
    },
    created_at:{
        type:Date,
        default:new Date
    }
})


export const UserModel = mongoose.model('user',UserSchema)