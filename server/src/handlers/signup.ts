import { Request, Response } from "express";
import User from "../database/userSchema";
import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/middleware";

export default async function signup(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ error: "user already exists" });
    } else {
      const newUser = new User({
        username,
        password,
      });
      await newUser.save();
      if (newUser) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.status(200).json({
          _id: newUser._id,
          username: newUser.username,
          password: newUser.password,
          token: token,
        });
      } else {
        return res.status(400).json({ error: "Invalid user data" });
      }
    }
  } catch (e) {
    console.log(`error ${e}`);
    return res.status(500).send(`Error in the server`);
  }
}
