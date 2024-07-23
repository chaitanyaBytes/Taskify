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
exports.default = deleteTodo;
const todoSchema_1 = __importDefault(require("../database/todoSchema"));
const userSchema_1 = __importDefault(require("../database/userSchema"));
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoId = req.params.todoId;
            const user = yield userSchema_1.default.findById(req.headers.userId);
            if (!user) {
                return res.status(404).json({ error: "user not found" });
            }
            let todoExists;
            for (let i = 0; i < user.userTodos.length; i++) {
                if (user.userTodos[i].toString() === todoId) {
                    todoExists = todoId;
                    break;
                }
            }
            // const todoExists = user.userTodos.find((todo) => todo.toString() === todoId);
            if (!todoExists) {
                return res
                    .status(403)
                    .json({ error: "Todo does not exist for this user" });
            }
            const deletedTodo = yield todoSchema_1.default.findByIdAndDelete(todoId);
            if (!deletedTodo) {
                return res.status(404).json({ error: "Cannot delete the todo" });
            }
            user.userTodos = user.userTodos.filter((todo) => todo.toString() !== todoId);
            yield user.save();
            console.log(deletedTodo);
            return res.status(200).json({ message: "todo deleted successfully" });
        }
        catch (e) {
            console.log("error: ", e);
            return res.status(500).json({ error: "internal server error" });
        }
    });
}
