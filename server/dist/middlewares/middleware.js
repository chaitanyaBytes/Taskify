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
exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../database/userSchema"));
exports.SECRET = "S3CR3T";
const jwtAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json({ error: "no headers found" });
        }
        const token = authHeader.split(" ")[1];
        if (token && typeof token == "string") {
            try {
                const verified = jsonwebtoken_1.default.verify(token, exports.SECRET);
                console.log(verified);
                const user = yield userSchema_1.default.findOne({ username: verified });
                if (!user) {
                    return res.status(403).json({ msg: "forbidden" });
                }
                req.headers["userId"] = JSON.stringify(user);
                next();
            }
            catch (e) {
                console.log(`JWT verification failed ${e}`);
                return res.status(500).json({ error: "forbidden" });
            }
        }
        else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
    catch (e) {
        console.log(`error: ${e}`);
        return res.status(500).json({ error: "internal server erorr" });
    }
});
exports.default = jwtAuthentication;
