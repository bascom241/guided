"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    tittle: {
        type: String,
        required: [true, 'Course Tittle is required']
    },
    description: {
        type: String,
        required: [true, 'Course Description is required'],
        trim: true
    },
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Course Instructor is required']
    },
    duration: {
        type: Number,
        required: [true, 'Course duration is required'],
        min: [1, 'Course duration must be more than one minute']
    },
    category: {
        type: String,
        required: [true, 'Course category is required']
    },
    subCategory: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Course price cannot be negative']
    },
    level: {
        type: String,
        required: [true, 'Course level is required'],
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    thumbnail: {
        type: String,
        required: [true, 'Course thumbnail is required'],
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v);
            },
            message: (props) => `${props.value} is a valid url`
        }
    },
    videos: [
        {
            tittle: {
                type: String,
                required: [true, 'Course video tittle is required'],
            },
            videoFilePath: {
                type: String,
                required: [true, 'Course video file path is required'],
                validate: {
                    validator: function (v) {
                        return /^https?:\/\/.+\.(mp4|mkv|avi|mov|flv)$/.test(v);
                    },
                    message: (props) => `${props.value} is not a valid video URL!`,
                }
            },
            duration: {
                type: Number,
                required: [true, 'Video duration is required'],
                min: [1, 'Video duration must be greater than 1 minute']
            }
        }
    ],
    ratings: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: [true, 'User id is required']
            },
            rating: {
                type: Number,
                required: [true, 'Rating is required'],
                min: [1, 'Rating must be greater than 1'],
                max: [5, 'Rating cannot be more than Five']
            }
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                required: [true, 'User id is required']
            },
            comment: {
                type: String,
                required: [true, "Comments are Required"]
            }
        }
    ]
}, { timestamps: true });
const Course = (0, mongoose_1.model)('Course', courseSchema);
exports.default = Course;
