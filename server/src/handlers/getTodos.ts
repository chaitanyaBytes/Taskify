import { Request, Response } from "express";
import User from "../database/userSchema";

export default async function getTodos(req: Request, res: Response) {
  try {
    const user = await User.findById(req.headers.userId).populate("userTodos");
    if (!user) {
      return res.status(403).json({ error: "user not found" });
    }

    return res.status(200).json(user.userTodos);
  } catch (e) {
    console.log("error: ", e);
    return res.status(500).json({ error: "internal server error" });
  }
}
