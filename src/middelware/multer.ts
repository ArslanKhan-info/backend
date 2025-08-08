import { Request } from 'express';
import fs from 'fs';
import multer from 'multer'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

type FileNameCallback = (error: Error | null, filename: string) => void

const uploadDir = path.join(__dirname, '../..', 'uploads')


if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}
const diskStorage = multer.diskStorage({
	destination: uploadDir,
	filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
		cb(null, file.originalname + uuidv4());
	},
});
// const storage = multer.memoryStorage()



const uploadMiddelware = multer({ storage: diskStorage })


export default uploadMiddelware