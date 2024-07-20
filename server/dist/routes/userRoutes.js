"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../handlers/signup"));
const login_1 = __importDefault(require("../handlers/login"));
const me_1 = __importDefault(require("../handlers/me"));
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.post("/signup", signup_1.default);
userRouter.post("/login", login_1.default);
userRouter.get("/me", middleware_1.default, me_1.default);
