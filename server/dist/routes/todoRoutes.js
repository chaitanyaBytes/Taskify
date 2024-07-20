"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const createTodo_1 = __importDefault(require("../handlers/createTodo"));
const middleware_1 = __importDefault(require("../middlewares/middleware"));
const updateTodo_1 = __importDefault(require("../handlers/updateTodo"));
const getTodos_1 = __importDefault(require("../handlers/getTodos"));
const deleteTodo_1 = __importDefault(require("../handlers/deleteTodo"));
const todoRouter = express_1.default.Router();
exports.todoRouter = todoRouter;
todoRouter.post("/create", middleware_1.default, createTodo_1.default);
todoRouter.put("/update/:todoId", middleware_1.default, updateTodo_1.default);
todoRouter.get("/myTodos", middleware_1.default, getTodos_1.default);
todoRouter.delete("/delete/:todoId", middleware_1.default, deleteTodo_1.default);
