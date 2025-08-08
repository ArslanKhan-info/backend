
import { checkOrCreateBucket, uploadFileToS3 } from './s3.services';

export const handleFileUpload = async (file: Express.Multer.File) => {
    try {
        await checkOrCreateBucket();
        const result = await uploadFileToS3(file);
        // console.log('result after upload =>',result)
        return result
    } catch (error) {
        console.error('Upload Controller Error:', error);
        throw error
    }
};
