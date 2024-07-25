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
exports.default = createTodo;
const todoSchema_1 = __importDefault(require("../database/todoSchema"));
const userSchema_1 = __importDefault(require("../database/userSchema"));
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, dueDate } = req.body;
            const newTodo = new todoSchema_1.default({
                title: title,
                description: description,
                dueDate: dueDate,
            });
            const user = yield userSchema_1.default.findById(req.headers.userId).populate("userTodos");
            if (!user) {
                return res.status(403).json({ error: "user not found" });
            }
            user.userTodos.push(newTodo._id);
            yield user.save();
            yield newTodo.save();
            return res.status(200).json({ newTodo });
        }
        catch (e) {
            console.log("error: ", e);
            return res.status(500).json({ error: "internal server error" });
        }
    });
}
