import express from 'express';
import { verifyRequestToken } from '../middelware/auth';
import { uploadController } from './controller/upload.controller';
import uploadMiddelware from '../middelware/multer';



const mediaRoutes = express.Router();


mediaRoutes.post('/upload_file',
    verifyRequestToken,
    uploadMiddelware.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'backgroundImage', maxCount: 1 },
        { name: 'galleryImages', maxCount: 10 },
    ]),
    uploadController
)

export default mediaRoutes