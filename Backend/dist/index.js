"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const courseRouter_1 = __importDefault(require("./routes/courseRouter"));
const cors_1 = __importDefault(require("cors"));
const cartRouter_1 = __importDefault(require("./routes/cartRouter"));
const enrollRouter_1 = __importDefault(require("./routes/enrollRouter"));
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/enroll', enrollRouter_1.default);
app.use('/api', cartRouter_1.default);
app.use('/api', userRouter_1.default);
app.use('/api/course', courseRouter_1.default);
const port = parseInt(process.env.PORT || '3000', 10);
app.listen(5000, () => {
    (0, dbConnection_1.default)();
    console.log(`Listening on port ${port}`);
});
