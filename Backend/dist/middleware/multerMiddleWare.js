"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadToCloudinary = void 0;
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_config_1 = __importDefault(require("../utils/cloudinary.config"));
const uploadToCloudinary = (fileBuffer, folder, resourceType) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_config_1.default.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary Upload Error:", error);
                reject(error);
            }
            else {
                resolve(result);
            }
        });
        streamifier_1.default.createReadStream(fileBuffer).pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
