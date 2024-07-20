import { Request, Response } from "express";
import User from "../database/userSchema";

export default async function me(req: Request, res: Response) {
  try {
    const userId = req.headers.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.json({ error: error });
  }
}
