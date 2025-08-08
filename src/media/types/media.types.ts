import { Schema } from "mongoose";




export interface Media {
    user_id: typeof Schema.ObjectId;
    status: 0 | 1 | 2
    // 0 deleted 1 active 2 inactive
    media_url: string
    created_at: Date
    media_type: 'profileImage' | 'backgroundImage' | 'galleryImages'
}   