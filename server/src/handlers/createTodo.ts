import { Request, Response } from "express";
import Todo from "../database/todoSchema";
import User from "../database/userSchema";

export default async function createTodo(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title: title,
      description: description,
    });

    const user = await User.findById(req.headers.userId).populate("userTodos");
    if (!user) {
      return res.status(403).json({ error: "user not found" });
    }

    user.userTodos.push(newTodo._id);
    await user.save();
    await newTodo.save();
    return res.status(200).json({ newTodo });
  } catch (e) {
    console.log("error: ", e);
    return res.status(500).json({ error: "internal server error" });
  }
}
