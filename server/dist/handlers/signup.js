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
exports.default = signup;
const userSchema_1 = __importDefault(require("../database/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middlewares/middleware");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, username, email, password } = req.body;
            const user = yield userSchema_1.default.findOne({ username });
            if (user) {
                res.status(403).json({ error: "user already exists" });
            }
            else {
                const newUser = new userSchema_1.default({
                    name,
                    username,
                    email,
                    password,
                });
                yield newUser.save();
                if (newUser) {
                    const token = jsonwebtoken_1.default.sign({ username }, middleware_1.SECRET, { expiresIn: "1h" });
                    res.status(200).json({
                        _id: newUser._id,
                        name: newUser.name,
                        username: newUser.username,
                        email: newUser.email,
                        password: newUser.password,
                        message: "Sucessfully signed up",
                        token: token,
                    });
                }
                else {
                    return res.status(400).json({ error: "Invalid user data" });
                }
            }
        }
        catch (e) {
            console.log(`error ${e}`);
            return res.status(500).send(`Error in the server`);
        }
    });
}
