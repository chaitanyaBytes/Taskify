import { Request, Response } from "express";
import Todo from "../database/todoSchema";
import User from "../database/userSchema";

export default async function updateTodo(req: Request, res: Response) {
  try {
    const todoId = req.params.todoId;
    const user = await User.findById(req.headers.userId);
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

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { done: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Cannot update the todo" });
    }

    return res.status(200).json({ message: "todo updated successfully" });
  } catch (e) {
    console.log("error: ", e);
    return res.status(500).json({ error: "internal server error" });
  }
}
