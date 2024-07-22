import { Request, Response } from "express";
import User from "../database/userSchema";
import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/middleware";

export default async function signup(req: Request, res: Response) {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ error: "user already exists" });
    } else {
      const newUser = new User({
        name,
        username,
        email,
        password,
      });
      await newUser.save();
      if (newUser) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
        res.status(200).json({
          _id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          message: "Sucessfully signed up",
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
