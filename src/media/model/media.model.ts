import mongoose, { mongo, Schema } from "mongoose";
import { Media } from "../types/media.types";




const MediaSchema = new Schema<Media>({
    user_id: {
        type: Schema.ObjectId,
        required: true
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    },
    //0 active 1 inactive
    media_url: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date
    },
    media_type: {
        type: String,
        enum: ['profileImage', 'backgroundImage', 'galleryImages']
    },
})


export const MediaModel = mongoose.model('media', MediaSchema)