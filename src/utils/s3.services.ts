import { s3 } from '../config/aws';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const deleteFile = promisify(fs.unlink);

const bucketName = process.env.BUCKET_NAME as string;

export const checkOrCreateBucket = async () => {
    try {
        await s3.headBucket({ Bucket: bucketName }).promise();
        console.log('✅ Bucket exists.');
    } catch (err: any) {
        console.log('❌ Bucket not found. Creating...');
        try {
            await s3.createBucket({
                Bucket: bucketName,
                CreateBucketConfiguration: {
                    LocationConstraint: 'ap-south-1',
                },
            }).promise();
            console.log('✅ Bucket created.');
        } catch (createErr: any) {
            console.error('❌ Failed to create bucket:', createErr?.message || createErr);
            throw createErr; // optional: rethrow to handle it upstream
        }
    }
};

export const uploadFileToS3 = async (file: Express.Multer.File) => {
    try {
        const fileContent = fs.readFileSync(file.path);
        const uniqueFileName = uuidv4() + '-' + file.originalname;

        const res = await s3.upload({
            Bucket: bucketName,
            Key: uniqueFileName,
            Body: fileContent,
            ACL: 'public-read',
        }).promise();

        await deleteFile(file.path); // cleanup temp file

        return {
            success: true,
            location: res.Location,
            res:res
        };
    } catch (error) {
        console.error('S3 Upload Error:', error);
        await deleteFile(file.path);
        throw {
            success: false,
            message: 'Upload failed',
            error
        };
    }
};
