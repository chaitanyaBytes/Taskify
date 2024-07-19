import { Request, Response } from "express";
import User from "../database/userSchema";
import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/middleware";

export default async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
      res.status(200).json({
        _id: user._id,
        username: user.username,
        password: user.password,
        token: token,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (e) {
    console.log(`error occured ${e}`);
    return res.status(500).json({ error: e });
  }
}
