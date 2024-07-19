import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../database/userSchema";

export const SECRET = "S3CR3T";

const jwtAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ error: "no headers found" });
    }
    const token = authHeader.split(" ")[1];
    if (token && typeof token == "string") {
      try {
        const verified = jwt.verify(token, SECRET);
        console.log(verified);
        const user = await User.findOne({ username: verified });
        if (!user) {
          return res.status(403).json({ msg: "forbidden" });
        }

        req.headers["userId"] = JSON.stringify(user);

        next();
      } catch (e) {
        console.log(`JWT verification failed ${e}`);
        return res.status(500).json({ error: "forbidden" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    console.log(`error: ${e}`);
    return res.status(500).json({ error: "internal server erorr" });
  }
};

export default jwtAuthentication;
