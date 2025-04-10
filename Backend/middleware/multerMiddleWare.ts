import multer, { StorageEngine } from "multer";
import streamifier from 'streamifier';
import cloudinary from "../utils/cloudinary.config";
import { UploadApiResponse, UploadStream } from "cloudinary";

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string, resourceType: "image" | "video"): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
            } else {
                resolve(result as UploadApiResponse);
            }
        });
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};


const storage: StorageEngine = multer.memoryStorage();
export const upload = multer({ storage });




