"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessfullEmail = exports.sendEmail = exports.sendPasswordResetEmail = void 0;
// @ts-ignore
const sib_api_v3_sdk_1 = __importDefault(require("sib-api-v3-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const emailTemplate_1 = require("./emailTemplate");
dotenv_1.default.config();
const sendEmail = (to, verificationToken, fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize Brevo API
        let defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        let apiInstance = new sib_api_v3_sdk_1.default.TransactionalEmailsApi();
        let sendSmtpEmail = new sib_api_v3_sdk_1.default.SendSmtpEmail();
        sendSmtpEmail.sender = { email: process.env.EMAIL_FROM };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = "Email Verification";
        sendSmtpEmail.htmlContent = (0, emailTemplate_1.emailContent)(fullName, verificationToken);
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
});
exports.sendEmail = sendEmail;
const sendPasswordResetEmail = (to, fullName, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize Brevo API
        let defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        let apiInstance = new sib_api_v3_sdk_1.default.TransactionalEmailsApi();
        let sendSmtpEmail = new sib_api_v3_sdk_1.default.SendSmtpEmail();
        sendSmtpEmail.sender = { email: process.env.EMAIL_FROM };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = "Password Reset";
        sendSmtpEmail.htmlContent = (0, emailTemplate_1.resetPasswordEmailContent)(fullName, resetLink);
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessfullEmail = (to) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Initialize Brevo API
        let defaultClient = sib_api_v3_sdk_1.default.ApiClient.instance;
        let apiKey = defaultClient.authentications["api-key"];
        apiKey.apiKey = process.env.BREVO_API_KEY;
        let apiInstance = new sib_api_v3_sdk_1.default.TransactionalEmailsApi();
        let sendSmtpEmail = new sib_api_v3_sdk_1.default.SendSmtpEmail();
        sendSmtpEmail.sender = { email: process.env.EMAIL_FROM };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = "Password Reset";
        sendSmtpEmail.htmlContent = (0, emailTemplate_1.resetSuccessfulEmailContent)(to);
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully:", response);
        return response;
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent.");
    }
});
exports.sendResetSuccessfullEmail = sendResetSuccessfullEmail;
