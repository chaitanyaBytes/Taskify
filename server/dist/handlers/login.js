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
exports.default = login;
const userSchema_1 = __importDefault(require("../database/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middlewares/middleware");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield userSchema_1.default.findOne({ username, password });
            if (user) {
                const token = jsonwebtoken_1.default.sign({ username }, middleware_1.SECRET, { expiresIn: "1h" });
                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    password: user.password,
                    token: token,
                    message: "Successfully logged in.",
                });
            }
            else {
                return res.status(400).json({ error: "Invalid user data" });
            }
        }
        catch (e) {
            console.log(`error occured ${e}`);
            return res.status(500).json({ error: e });
        }
    });
}
