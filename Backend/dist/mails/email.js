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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSucessfulEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const mailtrap_config_1 = require("../mailtrap.config");
const emailTemplate_1 = require("./emailTemplate");
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.MailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Verify Your Email",
            html: emailTemplate_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification",
        });
        console.log("Email sent successfully:", response);
    }
    catch (err) {
        console.error("Error sending email:", err);
        throw new Error("Error sending email: " + err);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || typeof email !== "string" || !email.includes("@")) {
        throw new Error("Invalid recipient email address.");
    }
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.MailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            template_uuid: "50fe29a0-2e81-4160-8d65-42166d5d37fa",
            template_variables: {
                "name": name,
                "company_info_name": "GuidEd",
            }
        });
        console.log("Welcome Email sent: " + response);
    }
    catch (err) {
        console.error("Error sending email:", err);
        throw new Error("Error sending email: " + err);
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = (email, resetUrl) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || typeof email !== "string" || !email.includes("@")) {
        throw new Error("Invalid recipient email address.");
    }
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.MailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Reset Your Password",
            html: emailTemplate_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset",
        });
        console.log(" Reset Password Email Sent " + response);
    }
    catch (err) {
        throw new Error("Error sending password reset request" + err);
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSucessfulEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || typeof email !== "string" || !email.includes("@")) {
        throw new Error("Invalid recipient email address.");
    }
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.MailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: emailTemplate_1.PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset sent successfully" + response);
    }
    catch (error) {
        throw new Error("Error sending password reset request" + error);
    }
});
exports.sendResetSucessfulEmail = sendResetSucessfulEmail;
