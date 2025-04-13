"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    origin: "https://guided-backend-9hw5.onrender.com",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const courseRouter_1 = __importDefault(require("./routes/courseRouter"));
const cartRouter_1 = __importDefault(require("./routes/cartRouter"));
const enrollRouter_1 = __importDefault(require("./routes/enrollRouter"));
// All routes AFTER middleware
app.use('/api/enroll', enrollRouter_1.default);
app.use('/api', cartRouter_1.default);
app.use('/api', userRouter_1.default);
app.use('/api/course', courseRouter_1.default);
const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port, () => {
    (0, dbConnection_1.default)();
    console.log(`Listening on port ${port}`);
});
