import express from "express";
import createTodo from "../handlers/createTodo";
import jwtAuthentication from "../middlewares/middleware";
import updateTodo from "../handlers/updateTodo";
import getTodos from "../handlers/getTodos";
import deleteTodo from "../handlers/deleteTodo";
const todoRouter = express.Router();

todoRouter.post("/create", jwtAuthentication, createTodo);
todoRouter.put("/update/:todoId", jwtAuthentication, updateTodo);
todoRouter.get("/myTodos", jwtAuthentication, getTodos);
todoRouter.delete("/delete/:todoId", jwtAuthentication, deleteTodo);
export { todoRouter };
