import { Request, Response } from "express";
import User from "../database/userSchema";

export default async function getUser(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.json({ error: error });
  }
}
