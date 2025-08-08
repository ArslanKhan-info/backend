import { Response } from "express"
import { CustomeAuthRequest } from "../../user/types/auth.types";
import { handleFileUpload } from "../../utils/s3.controller";
import { MediaModel } from "../model/media.model";




export const uploadController = async (
    req: CustomeAuthRequest,
    res: Response
) => {
    try {
        console.log('object',req.files);
        if (req.files && !Array.isArray(req.files) && req.files?.['profileImage']?.length > 0) {
            const profileImage = req.files['profileImage'][0]
            const uploadResult: any = await handleFileUpload(profileImage)
            if (uploadResult.success) {
                await MediaModel.updateMany({ user_id: req?.user?.id, media_type: 'profileImage', status: 1 }, { status: 2 })
                await MediaModel.create({
                    user_id: req?.user?.id,
                    media_type: 'profileImage',
                    media_url: uploadResult.location
                })
            } else {
                throw uploadResult
            }

        }
        if (req.files && !Array.isArray(req.files) && req.files['backgroundImage']?.length > 0) {
            const backgroundImage = req.files['backgroundImage'][0]
            const uploadResult: any = await handleFileUpload(backgroundImage)
            if (uploadResult.success) {
                await MediaModel.updateMany({ user_id: req?.user?.id, media_type: 'backgroundImage', status: 1 }, { status: 2 })
                await MediaModel.create({
                    user_id: req?.user?.id,
                    media_type: 'backgroundImage',
                    media_url: uploadResult.location
                })
            } else {
                throw uploadResult
            }

        }
        if (req.files && !Array.isArray(req.files) && req.files?.['galleryImages']?.length > 0) {
            const galleryImages = req.files['galleryImages'] || []
            try {
                const galleryImagesPromisses = await Promise.all(galleryImages.map(async (galleryImage) => {
                    const uploadResult: any = await handleFileUpload(galleryImage)
                    if (uploadResult.success) {
                        // await MediaModel.updateMany({ user_id: req?.user?.id, media_type: 'galleryImages', status: 1 }, { status: 2 })
                        // await MediaModel.create({
                        //     user_id: req?.user?.id,
                        //     media_type: 'galleryImages',
                        //     media_url: uploadResult.location
                        // })
                        return {
                            user_id: req?.user?.id,
                            media_type: 'galleryImages',
                            media_url: uploadResult.location
                        }
                    } else {
                        throw uploadResult
                    }

                })
                )
                await MediaModel.create(galleryImagesPromisses)
            } catch (err) {
                throw err
            }
        }
        res.status((201)).json({
            status: true,
            messages: 'Images uploaded sucessfully'
        })
    } catch (err: any) {
        console.error('error in send uploadController==>', err)
        res.status(409).json({
            status: false,
            message: err?._message || "Error in upload image",
            error: err
        })
    }
}